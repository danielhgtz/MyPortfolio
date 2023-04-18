import { Button } from "antd";
import { GitHubVector } from "../../../../../Assets/ToolsVectors/GitHubVector";
import { StartVector } from "../../../../../Assets/ProjectVectors/StartVector";

import "./ProjectComponent.css";

export const ProjectComponent = ({
  index,
  image,
  vector,
  title,
  text,
  technologies,
  booleanGithub,
  gitHubLink,
  booleanDemo,
  demoLinkFx,
  demoTitle,
}) => {
  return (
    <div className="HPInnerDiv" key={index}>
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
            {booleanGithub ? (
              <Button className="glowingColorButton" href={gitHubLink}>
                <GitHubVector className="vector20px" />
                Github
              </Button>
            ) : null}

            {booleanDemo ? (
              <Button className="glowingColorButton" onClick={demoLinkFx}>
                <StartVector /> {demoTitle ? demoTitle : "Demo"}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
