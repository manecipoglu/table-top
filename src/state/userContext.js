import { createContext, useReducer, useContext } from "react";
import userReducer from "./userReducer";

const UserContext = createContext(null);

let age;
try {
  age = JSON.parse(localStorage.getItem("age")) ?? "";
  const now = new Date();
  if (now.getTime() > age.expiry) {
    localStorage.removeItem("age");
    age = "";
  }
} catch {
  console.error("The age could not ve parsed into JSON.");
  age = "";
}

export function UserProvider(props) {
  const [userAge, dispatch] = useReducer(userReducer, age.value);

  return (
    <UserContext.Provider value={{ userAge, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUser must be used within a UserProvider. Wrap a parent component in <UserProvider> to fix this error."
    );
  }
  return context;
}
