import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ResumePDF from "./Pages/Resume/Resume";

import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Resume" element={<ResumePDF />} />

          {/* <Route index="*" element} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
