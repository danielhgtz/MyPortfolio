import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ResumePDF from "./Pages/Resume/Resume";
// import LaborSettlementCalculator from "../Pages/LaborSettlementApp/src/Pages/Finiquito/LaborSettlementCalculator";
import LaborSettlementCalculator from "./Pages/LaborSettlementApp/src/Pages/Finiquito/LaborSettlementCalculator";

import "./App.css";
import ParentFiniquito from "./Pages/LaborSettlementApp/src/Pages/Finiquito/Components/Parent/Parent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Resume" element={<ResumePDF />} />
          <Route
            path="LaborSettlement"
            element={<LaborSettlementCalculator />}
          />
          {/* <Route index="*" element} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
