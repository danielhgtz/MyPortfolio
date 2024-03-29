import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ResumePDF from "./Pages/Resume/Resume";

import LaborSettlementCalculator from "./Pages/LaborSettlementApp/src/Pages/Finiquito/LaborSettlementCalculator";

import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import "bootstrap/dist/css/bootstrap.min.css";
// import "./myStyles.css";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "./App.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home className="black" />} />
          <Route path="resume" element={<ResumePDF />} />
          <Route
            path="laborSettlement"
            element={<LaborSettlementCalculator />}
          />
          {/* <Route path="planodi/*" element={<Planodi />} /> */}
          {/* <Route index element={<Explore />} /> */}

          {/* <Route path="buscador" element={<Explore />} /> */}
          {/* <Route index="*" element} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};
/*
<Routes>
        <Route exact path="/Planodi" component={HomePage} />
        <Route exact path="/registro" component={HomePage} />
        <Route exact path="/login" component={HomePage} />
        <Route exact path="/buscador" component={Explore} />
        <Route exact path="/verificar-correo" component={HomePage} />
        <Route exact path="/afiliarme" component={AfiliarmeIndex} />
        <Route exact path="/admin" component={AdminIndex} />
        <Route exact path="/mis-negocios" component={MisNegociosIndex} />
        <Route exact path="/change-password" component={ChangePassword} />
        <Route
          exact
          path="/mis-negocios/:pathName"
          component={EditarNegocioIndex}
        />
        <Route exact path="/informacion" component={LandingAliados} />
        <Route exact path="/negocios/:pathName" component={RootTemplates} />
        <Route exact path="/paquetes/:paqueteId" component={PaquetesPage} />
        <Route path="*" component={HomePage}>
          <Navigate to="/" />
        </Route>
      </Routes>*/

export default App;
