import React, { useRef } from "react";
import { HomeMain } from "./Components/HomeMain/HomeMain";
import { HomeIntroductionText } from "./Components/HomeIntroductionText/HomeIntroductionText";
import { Navbar } from "../../Components/Navbar/Navbar";
import { ParticlesBackground } from "../../Components/TsParticles/TsParticles";
import { HomeSkills } from "./Components/HomeSkills&Tools/HomeSkills/HomeSkills";
import { HomeTools } from "./Components/HomeSkills&Tools/HomeTools/HomeTools";
import { HomeProjects } from "./Components/HomeProjects/HomeProjects";
import { Footer } from "../../Components/Footer/Footer";

import "./Home.css";

const Home = () => {
  const homeAboutRef = useRef(null);
  const homeSkillsRef = useRef(null);
  const homeProjectsRef = useRef(null);

  return (
    <div className="blackBackground">
      <div className="container ">
        <ParticlesBackground />
        <HomeMain />
        <HomeIntroductionText homeAboutRef={homeAboutRef} />
        <HomeSkills homeSkillsRef={homeSkillsRef} />
        <HomeTools />
        <HomeProjects homeProjectsRef={homeProjectsRef} />
        <Footer />
        <Navbar
          homeAboutRef={homeAboutRef}
          homeSkillsRef={homeSkillsRef}
          homeProjectsRef={homeProjectsRef}
        />
      </div>
    </div>
  );
};

export default Home;
