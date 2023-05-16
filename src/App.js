import React, { useReducer, useEffect } from "react";
import { appReducer } from "./utils/Reducer";
import { isEmpty } from "lodash";
import api from "./utils/api";

function App() {
  const [data, dispatch] = useReducer(appReducer, {});

  useEffect(() => {
    if (!isEmpty(window?.preloadedData?._data)) {
      dispatch({
        type: "fetchInitialData",
        payload: window?.preloadedData?._data,
      });
    } else {
      api({
        url: "/bank-details",
        method: "get",
      })
        .then(({ data }) =>
          dispatch({
            type: "fetchInitialData",
            payload: data,
          })
        )
        .catch((err) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={`/images/logo192.png`} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
