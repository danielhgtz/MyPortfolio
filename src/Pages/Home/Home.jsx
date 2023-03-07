import "./Home.css";
import { HomeMain } from "./Components/HomeMain/HomeMain";
import { HomeIntroductionText } from "./Components/HomeIntroductionText/HomeIntroductionText";
import { Navbar } from "../../Components/Navbar/Navbar";
import { ParticlesBackground } from "../../Components/TsParticles/TsParticles";
import { HomeSkills } from "./Components/HomeSkills&Tools/HomeSkills/HomeSkills";
import { HomeTools } from "./Components/HomeSkills&Tools/HomeTools/HomeTools";
import { HomeProjects } from "./Components/HomeProjects/HomeProjects";
import { Footer } from "../../Components/Footer/Footer";

const Home = () => {
  return (
    <div className="container">
      <ParticlesBackground />
      <Navbar />
      <HomeMain />
      <HomeIntroductionText />
      <HomeSkills />
      <HomeTools />
      <HomeProjects />
      <Footer />
    </div>
  );
};

export default Home;
