import {
  gitVector,
  gitHubVector,
  jsVector,
  mongoDBVector,
  mySQLVector,
  nodeJS,
  reactVector,
  typescriptVector,
  expressVector,
  htmlVector,
  cssVector,
} from "../../../../../Assets/SkillsVectors/SkillsVectors";
import "../HomeSkills&Tools.css";

export const HomeSkills = () => {
  return (
    <div className="mainDiv">
      <h1>Professional Skills:</h1>
      <div className="row">
        <div className="div1">
          <div className="innerDiv">{reactVector}</div>
        </div>
        <div className="div1">
          <div className="innerDiv">{typescriptVector}</div>
        </div>
        <div className="div1">
          <div className="innerDiv">{jsVector}</div>
        </div>
        <div className="div1">
          <div className="innerDiv"> {nodeJS} </div>
        </div>
        <div className="div1">
          <div className="innerDiv">{mySQLVector}</div>
        </div>
        <div className="div1">
          <div className="innerDiv">{mongoDBVector}</div>
        </div>
        <div className="div1">
          <div className="innerDiv">{gitVector}</div>
        </div>
        <div className="div1">
          <div className="innerDiv">{expressVector}</div>
        </div>
        <div className="div1">
          <div className="innerDiv">{htmlVector}</div>
        </div>
        <div className="div1">
          <div className="innerDiv">{cssVector}</div>
        </div>
        {/* <div className="div1"> {gitHubVector}</div> */}
      </div>
    </div>
  );
};
