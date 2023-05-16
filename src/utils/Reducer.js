export const appReducer = (state, action) => {
  switch (action.type) {
    case "fetchInitialData": {
      return action.payload;
    }
    default:
      return state;
  }
};
