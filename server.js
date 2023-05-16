import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import coreRouters from "./routers/coreApis";
import React from "react";
import { renderToString } from "react-dom/server";
import path from "path";
import fs from "fs";
import App from "./src/App";
import { InitialDataContext } from "./src/utils/Context";

const app = express();
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:8081"],
    credentials: true,
  })
);
global.window = {};
const contextObject = {
  _isServerSide: true,
  _requests: [],
  _data: {},
};

app.use(express.static("./build", { index: false }));

// routers
app.use("/", coreRouters);

app.get("/*", async (_, res) => {
  renderToString(
    <InitialDataContext.Provider value={contextObject}>
      <App />
    </InitialDataContext.Provider>
  );

  await Promise.all(contextObject._requests);
  contextObject._isServerSide = false;
  contextObject._requests = [];

  const reactApp = renderToString(
    <InitialDataContext.Provider value={contextObject}>
      <App />
    </InitialDataContext.Provider>
  );

  const templateFile = path.resolve("./build/index.html");
  fs.readFile(templateFile, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res
        .status(200)
        .send(
          data.replace(
            `<div id="root"></div>`,
            `<div id="root">${reactApp}</div><script>window.preloadedData=${JSON.stringify(
              contextObject
            )}</script>`
          )
        );
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
