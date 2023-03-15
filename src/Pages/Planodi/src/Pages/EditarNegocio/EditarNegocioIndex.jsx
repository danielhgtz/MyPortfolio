import React, { useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import RutaPrivada from "../../componentes/RutaPrivada";
import { userHeaders } from "../../Utils/headerSetter";
import { userAuthError, userGetUserSuccess } from "../../actions/userActions";
import Loading from "../../componentes/Loading/Loading";
import EditarNegocio from "./EditarNegocio";

export default function EditarNegocioIndex({ match }) {
  const { path } = match;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    axios
      .get(
        `${
          process.env.REACT_APP_ENV === "development"
            ? process.env.REACT_APP_API_LOCAL
            : process.env.REACT_APP_API_PROD
        }user/get`,
        userHeaders(false)
      )
      .then((res) => {
        const { token, user } = res.data;
        dispatch(userGetUserSuccess(token, user));
        setLoading(false);
      })
      .catch(() => {
        dispatch(userAuthError());
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Switch>
          <RutaPrivada
            exact
            path={path}
            Component={EditarNegocio}
            userAuth={isAuthenticated}
          />
        </Switch>
      )}
    </>
  );
}
