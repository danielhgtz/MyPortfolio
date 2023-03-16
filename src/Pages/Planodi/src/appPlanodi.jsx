import React from "react";
import { Routes, Route, Redirect } from "react-router-dom";

import loadable from "@loadable/component";

const LandingAliados = loadable(() =>
  import("./Pages/LandingAliados/LandingAliados")
);
const PaquetesPage = loadable(() =>
  import("./Pages/PaquetesPage/PaquetesPage")
);
const ChangePassword = loadable(() =>
  import("./Pages/ChangePassword/ChangePassword")
);
const HomePage = loadable(() => import("./Pages/HomePage/HomePage"));
const RootTemplates = loadable(() =>
  import("./Pages/RootTemplates/RootTemplates")
);
const Explore = loadable(() => import("./Pages/Explore/Explore"));
const AfiliarmeIndex = loadable(() =>
  import("./Pages/Afiliarme/AfiliarmeIndex")
);
const MisNegociosIndex = loadable(() =>
  import("./Pages/MisNegocios/MisNegociosIndex")
);
const EditarNegocioIndex = loadable(() =>
  import("./Pages/EditarNegocio/EditarNegocioIndex")
);
const AdminIndex = loadable(() => import("./Pages/Admin/AdminIndex"));

function AppPlanodi() {
  return (
    <Route exact path="/" element={HomePage}>
      {/* <Route exact path="registro" element={HomePage} />
        <Route exact path="login" element={HomePage} /> */}
      {/* <Route exact path="buscador" element={Explore} /> */}
      {/* <Route exact path="verificar-correo" element={HomePage} />
        <Route exact path="afiliarme" element={AfiliarmeIndex} />
        <Route exact path="admin" element={AdminIndex} />
        <Route exact path="mis-negocios" element={MisNegociosIndex} />
        <Route exact path="change-password" element={ChangePassword} /> */}
    </Route>
  );
}

export default AppPlanodi;
