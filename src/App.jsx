<<<<<<< HEAD
import "./App.css";
import Home from "./Pages/Home/Home";
=======
<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ResumePDF from "./Pages/Resume/Resume";

import "./App.css";
=======
import "./App.css";
import Home from "./Pages/Home/Home";
>>>>>>> bce94ca7e6de6a92dafbb6ab56e1906b28659e6f
>>>>>>> 1de48b3 (fix)

function App() {
  return (
    <div>
<<<<<<< HEAD
      <Home />
=======
<<<<<<< HEAD
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Resume" element={<ResumePDF />} />

          {/* <Route index="*" element} /> */}
        </Routes>
      </BrowserRouter>
=======
      <Home />
>>>>>>> bce94ca7e6de6a92dafbb6ab56e1906b28659e6f
>>>>>>> 1de48b3 (fix)
    </div>
  );
}

export default App;
