import { Button } from "antd";
import { GitHubVector } from "../../../../../Assets/ToolsVectors/GitHubVector";
import { StartVector } from "../../../../../Assets/ProjectVectors/StartVector";

import "./ProjectComponent.css";

export const ProjectComponent = ({
  image,
  vector,
  title,
  text,
  technologies,
  gitHubLink,
  booleanDemo,
  demoLink,
}) => {
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
      </div>
    </div>
  );
};
