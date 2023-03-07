import "./ProjectComponent.css";
import { Button } from "antd";

export const ProjectComponent = ({
  image,
  title,
  text,
  technologies,
  gitHubLink,
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
      </div>
    </div>
  );
};
