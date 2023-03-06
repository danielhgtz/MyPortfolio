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
  };

  return (
    <nav>
      <div className="nameContainer">
        <a className="navbarName" onClick={navigateTop}>
          Daniel H. Gutierrez
        </a>
      </div>
      <div className="linkContainer">
        <div>
          <a className="about">
            <AboutSVGFile /> About
          </a>
        </div>
        <div>
          <a className="experience">
            <ExperienceSVGFile />
            Experience
          </a>
        </div>
        <div>
          <a className="projects">
            <ProjectsSVGFile />
            Projects
          </a>
        </div>
        <div>
          <a className="resume">
            <ResumeSVGFile />
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
};
