export default function userReducer(userState, action) {
  switch (action.type) {
    case "AGE_CHECK":
      return action.payload;

    default:
      throw new Error("Unhandled action " + action.type);
  }
}
