import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { ParticlesBackground } from "./Components/TsParticles/TsParticles";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <div>
      <ParticlesBackground />
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
