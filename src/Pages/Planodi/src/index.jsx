import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Routes, Route, Redirect } from "react-router-dom";
import theme from "./theme";

import "bootstrap/dist/css/bootstrap.min.css";
import "./myStyles.css";
import { Provider } from "react-redux";
import { store } from "./store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import HomePage from "./Pages/HomePage/HomePage";

import HomePage from "./Pages/HomePage/HomePage";
import Explore from "./Pages/Explore/Explore";
import AfiliarmeIndex from "./Pages/Afiliarme/AfiliarmeIndex";
import AdminIndex from "./Pages/Admin/AdminIndex";
import MisNegociosIndex from "./Pages/MisNegocios/MisNegociosIndex";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import EditarNegocioIndex from "./Pages/EditarNegocio/EditarNegocioIndex";
import LandingAliados from "./Pages/LandingAliados/LandingAliados";
import RootTemplates from "./Pages/RootTemplates/RootTemplates";
import PaquetesPage from "./Pages/PaquetesPage/PaquetesPage";

export const Planodi = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="registro" element={<HomePage />} />
            <Route path="login" element={<HomePage />} />
            <Route path="buscador" element={<Explore />} />
            <Route path="verificar-correo" element={<HomePage />} />
            <Route path="afiliarme" element={<AfiliarmeIndex />} />
            <Route path="admin" element={<AdminIndex />} />
            <Route path="mis-negocios" element={<MisNegociosIndex />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route
              path="/mis-negocios/:pathName"
              element={<EditarNegocioIndex />}
            />
            <Route path="informacion" element={<LandingAliados />} />
            <Route path="negocios/:pathName" element={<RootTemplates />} />
            <Route path="paquetes/:paqueteId" element={<PaquetesPage />} />
          </Routes>
          <ToastContainer />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};
