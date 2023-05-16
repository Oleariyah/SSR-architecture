import axios from "axios";

function api(options = {}) {
  return new Promise((resolve, reject) => {
    axios
      .request(options)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default api;
