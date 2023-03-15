import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ResumePDF from "./Pages/Resume/Resume";
// import LaborSettlementCalculator from "../Pages/LaborSettlementApp/src/Pages/Finiquito/LaborSettlementCalculator";
import LaborSettlementCalculator from "./Pages/LaborSettlementApp/src/Pages/Finiquito/LaborSettlementCalculator";
import HomePage from "./Pages/Planodi/src/Pages/HomePage/HomePage";

import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home className="black" />} />
          <Route path="Resume" element={<ResumePDF />} />
          <Route
            path="LaborSettlement"
            element={<LaborSettlementCalculator />}
          />
          <Route path="Planodi" element={<HomePage />} />
          {/* <Route index="*" element} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
