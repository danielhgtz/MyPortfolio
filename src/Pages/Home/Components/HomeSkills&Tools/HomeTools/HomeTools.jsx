import "../HomeSkills&Tools.css";
import {
  visualStudioVector,
  gitHubVector,
  figmaVector,
  photoShopVector,
  postmanVector,
  slackVector,
  microsoftOfficeVector,
  awsVector,
} from "../../../../../Assets/ToolsVectors/ToolsVectors";

export const HomeTools = () => {
  return (
    <div>
      <div className="mainDiv">
        <h1>Software & Tools:</h1>

        <div className="row">
          <div className="div1">
            <div className="innerDiv">{visualStudioVector}</div>
          </div>
          <div className="div1">
            <div className="innerDiv">{gitHubVector}</div>
          </div>
          <div className="div1">
            <div className="innerDiv">{figmaVector}</div>
          </div>
          <div className="div1">
            <div className="innerDiv">{photoShopVector}</div>
          </div>
          <div className="div1">
            <div className="innerDiv">{postmanVector}</div>
          </div>
          <div className="div1">
            <div className="innerDiv">{slackVector}</div>
          </div>
          <div className="div1">
            <div className="innerDiv">{microsoftOfficeVector}</div>
          </div>
          <div className="div1">
            <div className="innerDiv"> {awsVector}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
