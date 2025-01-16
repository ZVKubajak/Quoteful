import { Navigate } from "react-router-dom";
import auth from "./auth";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  if (!auth.loggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const LoggedInAuth = ({ children }: { children: JSX.Element }) => {
  if (auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }
  return children;
};
