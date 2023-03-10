import React, { useState } from "react";

import { navigateTop } from "../../Utilities/Utilities";

import { AboutVector } from "../../Assets/NavbarVectors/AboutVector";
import { ExperienceVector } from "../../Assets/NavbarVectors/ExperienceVector";
import { ProjectsVectors } from "../../Assets/NavbarVectors/ProjectsVector";
import { ResumeVector } from "../../Assets/NavbarVectors/ResumeVector";

import "./Navbar.css";

export const Navbar = ({ homeAboutRef, homeSkillsRef, homeProjectsRef }) => {
  const [navbarBoolean, setNavbarBoolean] = useState(false);

  const changeNavBarBackground = () => {
    if (window.scrollY >= 100) {
      setNavbarBoolean(true);
    } else {
      setNavbarBoolean(false);
    }
  };

  window.addEventListener("scroll", changeNavBarBackground);

  return (
    <nav className={navbarBoolean ? "navbarDiv active" : "navbarDiv"}>
      <div className="nameContainer">
        <a className="navbarName" onClick={navigateTop}>
          Daniel H. Gutierrez
        </a>
      </div>
      <div className="linkContainer">
        <div>
          <a
            className="navAbout"
            onClick={() => {
              homeAboutRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <AboutVector /> About
          </a>
        </div>
        <div>
          <a
            className="navExperience"
            onClick={() => {
              homeSkillsRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <ExperienceVector />
            Skills & Softwares
          </a>
        </div>

        <div>
          <a
            className="navProjects"
            onClick={() => {
              homeProjectsRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <ProjectsVectors />
            Projects
          </a>
        </div>
        <div>
          <a className="navResume">
            <ResumeVector />
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
};
