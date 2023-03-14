<<<<<<< HEAD
=======
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { GitHubVector } from "../../../../../Assets/ToolsVectors/GitHubVector";
import { StartVector } from "../../../../../Assets/ProjectVectors/StartVector";

import "./ProjectComponent.css";

export const ProjectComponent = ({
  image,
  vector,
=======
>>>>>>> 1de48b3 (fix)
import "./ProjectComponent.css";
import { Button } from "antd";

export const ProjectComponent = ({
  image,
<<<<<<< HEAD
=======
>>>>>>> bce94ca7e6de6a92dafbb6ab56e1906b28659e6f
>>>>>>> 1de48b3 (fix)
  title,
  text,
  technologies,
  gitHubLink,
<<<<<<< HEAD
=======
<<<<<<< HEAD
  booleanDemo,
  demoLink,
}) => {
  const navigate = useNavigate();

  return (
    <div className="HPInnerDiv">
      <div className="HPIndividualDiv">
        <div className="projectComponentDiv">
          <div className="PCImageCenter">
            <img className="PCImg" src={image} />
            {vector}
          </div>

          <h4 className="PCTitle">{title}</h4>
          <p className="PCDescriptionProject">{text}</p>
          <p className="PCTecnologies">Languages and frameworks used:</p>
          <div className="PCFrameworks">{technologies}</div>

          <div className="PCButtonsDiv">
            <Button className="glowingColorButton" href={gitHubLink}>
              <GitHubVector className="vector20px" />
              Github
            </Button>
            {booleanDemo ? (
              <Button className="glowingColorButton" href={demoLink}>
                <StartVector /> Demo
              </Button>
            ) : null}
          </div>
        </div>
=======
>>>>>>> 1de48b3 (fix)
}) => {
  return (
    <div className="projectComponentDiv">
      <div>
        <h4>{image}</h4>
      </div>
      <div>
        <h4 className="PCTitle">{title}</h4>
        <p className="PCDescriptionProject">{text}</p>
        <p className="PCTecnologies">
          Languages and frameworks used: {technologies}
        </p>
        <Button className="PCButton" href={gitHubLink}>
          Github
        </Button>
        <Button className="PCButton">Demo</Button>
<<<<<<< HEAD
=======
>>>>>>> bce94ca7e6de6a92dafbb6ab56e1906b28659e6f
>>>>>>> 1de48b3 (fix)
      </div>
    </div>
  );
};
