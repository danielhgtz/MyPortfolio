import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { ParticlesBackground } from "./Components/TsParticles/TsParticles";

function App() {
  return (
    <div>
      <ParticlesBackground />
      <Navbar />
    </div>
  );
}

export default App;
