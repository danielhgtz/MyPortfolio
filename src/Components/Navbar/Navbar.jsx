import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { navigateTop } from "../../Utilities/Utilities";
import { AboutVector } from "../../Assets/NavbarVectors/AboutVector";
import { ExperienceVector } from "../../Assets/NavbarVectors/ExperienceVector";
import { ProjectsVectors } from "../../Assets/NavbarVectors/ProjectsVector";
import { ResumeVector } from "../../Assets/NavbarVectors/ResumeVector";

import "./Navbar.css";

export const Navbar = ({ homeAboutRef, homeSkillsRef, homeProjectsRef }) => {
  const [navbarBoolean, setNavbarBoolean] = useState(false);
  const navigate = useNavigate();

  const changeNavBarBackground = () => {
    if (window.scrollY >= 100) {
      setNavbarBoolean(true);
    } else {
      setNavbarBoolean(false);
    }
  };

  window.addEventListener("scroll", changeNavBarBackground);

  const navigateToResume = () => {
    navigate("./Resume");
  };

  return (
    <nav className={navbarBoolean ? "navbarDiv active" : "navbarDiv"}>
      <div className="nameContainer">
        <div className="navbarName" onClick={navigateTop}>
          Daniel H. Gutierrez
        </div>
      </div>
      <div className="linkContainer">
        <div className="navbarElement">
          <div
            className="navAbout"
            onClick={() => {
              homeAboutRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <AboutVector /> About
          </div>
        </div>
        <div className="navbarElement">
          <div
            className="navExperience"
            onClick={() => {
              homeSkillsRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <ExperienceVector />
            Skills & Softwares
          </div>
        </div>

        <div className="navbarElement">
          <div
            className="navProjects"
            onClick={() => {
              homeProjectsRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <ProjectsVectors />
            Projects
          </div>
        </div>
        <div className="navbarElement">
          <div className="navResume" onClick={navigateToResume}>
            <ResumeVector />
            Resume
          </div>
        </div>
      </div>
    </nav>
  );
};
