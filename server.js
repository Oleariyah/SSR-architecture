import dotenv from "dotenv";
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import path from "path";
import fs from "fs";
import App from "./src/App";

const app = express();
dotenv.config();

app.use(express.static("./build", { index: false }));
app.get("/*", (_, res) => {
  const reactApp = renderToString(<App />);

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
            `<div id="root">${reactApp}</div>`
          )
        );
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
