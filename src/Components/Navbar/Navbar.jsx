<<<<<<< HEAD
=======
<<<<<<< HEAD
//import { useNavigate } from "react-router-dom";
//import { useIsLogged } from "../../helper/Context";

import "./Navbar.css";
import {
  AboutSVGFile,
  ExperienceSVGFile,
  ProjectsSVGFile,
  ResumeSVGFile,
} from "./NavbarSVG/NavbarSVGFile";

export const Navbar = () => {
  //const navigate = useNavigate();
  //const { isLogged, setIsLogged } = useIsLogged();

  const navigateTop = () => {
    window.scrollTo(0, 0);
=======
>>>>>>> 1de48b3 (fix)
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
<<<<<<< HEAD
=======
>>>>>>> bce94ca7e6de6a92dafbb6ab56e1906b28659e6f
>>>>>>> 1de48b3 (fix)
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
<<<<<<< HEAD
          <a className="navResume">
            <ResumeVector />
=======
<<<<<<< HEAD
          <a className="resume">
            <ResumeSVGFile />
=======
          <a className="navResume">
            <ResumeVector />
>>>>>>> bce94ca7e6de6a92dafbb6ab56e1906b28659e6f
>>>>>>> 1de48b3 (fix)
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
};
