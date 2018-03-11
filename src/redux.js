import history from "./history";

export const apiMiddleware = store => next => action => {
  next(action);
  switch (action.type) {
    case "LOGIN_USER":
      break;
    default:
      break;
  }
};
