// import React from "react";
// import {
//   Navigate,
//   BrowserRouter,
//   Route,
//   Routes,
//   useNavigate,
// } from "react-router-dom";

// import loadable from "@loadable/component";

// const LandingAliados = loadable(() =>
//   import("./Pages/LandingAliados/LandingAliados")
// );
// const PaquetesPage = loadable(() =>
//   import("./Pages/PaquetesPage/PaquetesPage")
// );
// const ChangePassword = loadable(() =>
//   import("./Pages/ChangePassword/ChangePassword")
// );
// const HomePage = loadable(() => import("./Pages/HomePage/HomePage"));
// const RootTemplates = loadable(() =>
//   import("./Pages/RootTemplates/RootTemplates")
// );
// const Explore = loadable(() => import("./Pages/Explore/Explore"));
// const AfiliarmeIndex = loadable(() =>
//   import("./Pages/Afiliarme/AfiliarmeIndex")
// );
// const MisNegociosIndex = loadable(() =>
//   import("./Pages/MisNegocios/MisNegociosIndex")
// );
// const EditarNegocioIndex = loadable(() =>
//   import("./Pages/EditarNegocio/EditarNegocioIndex")
// );
// const AdminIndex = loadable(() => import("./Pages/Admin/AdminIndex"));

// const PlanodiPages = () => {
//   return (
//     <Routes>
//       <Route exact path="/Planodi" component={HomePage} />
//       <Route exact path="/registro" component={HomePage} />
//       <Route exact path="/login" component={HomePage} />
//       <Route exact path="/buscador" component={Explore} />
//       <Route exact path="/verificar-correo" component={HomePage} />
//       <Route exact path="/afiliarme" component={AfiliarmeIndex} />
//       <Route exact path="/admin" component={AdminIndex} />
//       <Route exact path="/mis-negocios" component={MisNegociosIndex} />
//       <Route exact path="/change-password" component={ChangePassword} />
//       <Route
//         exact
//         path="/mis-negocios/:pathName"
//         component={EditarNegocioIndex}
//       />
//       <Route exact path="/informacion" component={LandingAliados} />
//       <Route exact path="/negocios/:pathName" component={RootTemplates} />
//       <Route exact path="/paquetes/:paqueteId" component={PaquetesPage} />
//       <Route path="*" component={HomePage}>
//         <Navigate to="/" />
//       </Route>
//     </Routes>
//   );
// };

// export default PlanodiPages;
