//import { useNavigate } from "react-router-dom";
//import { useIsLogged } from "../../helper/Context";
import "./Navbar.css";

export const Navbar = () => {
  //const navigate = useNavigate();
  //const { isLogged, setIsLogged } = useIsLogged();

  return (
    <nav>
      <div className="nameContainer">
        <a className="daniel">Daniel H. Gutierrez</a>
      </div>
      <a className="about">About</a>
      <a className="experience">Experience</a>
      <a className="projects">Projects</a>
      <a className="resume">Resume</a>
    </nav>
  );
};
