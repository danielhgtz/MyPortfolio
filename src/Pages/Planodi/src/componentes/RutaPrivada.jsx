import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RutaPrivada({ Component, exact, path, location }) {
  const authUser = useSelector((state) => state.user.isAuthenticated);
  const rootRoute = path.split("/")[1];
  let authorized = false;
  let pathname = "/";

  switch (rootRoute) {
    case "afiliarme":
      authorized = authUser;
      pathname = "/registro";
      break;
    case "mis-negocios":
      authorized = authUser;
      pathname = "/";
      break;
    case "admin":
      authorized = authUser;
      pathname = "/";
      break;
    case "change-password":
      authorized = authUser;
      pathname = "/";
      break;
    default:
      authorized = false;
      pathname = "/";
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={() =>
        authorized ? (
          <Component />
        ) : (
          <Route>
            <Navigate
              to={{
                pathname,
                state: { referrer: location },
              }}
            />
          </Route>
        )
      }
    />
  );
}
