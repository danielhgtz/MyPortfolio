import { VisualStudioVector } from "../../../../../Assets/ToolsVectors/VisualStudioVector";
import { GitHubVector } from "../../../../../Assets/ToolsVectors/GitHubVector";
import { FigmaVector } from "../../../../../Assets/ToolsVectors/FigmaVectorVector";
import { PhotoShopVector } from "../../../../../Assets/ToolsVectors/PhotoShopVector";
import { PostmanVector } from "../../../../../Assets/ToolsVectors/PostmanVector";
import { SlackVector } from "../../../../../Assets/ToolsVectors/SlackVector";
import { MicrosoftOfficeVector } from "../../../../../Assets/ToolsVectors/MicrosoftOfficeVector";
import { AwsVector } from "../../../../../Assets/ToolsVectors/AwsVector";

import "../HomeSkills&Tools.css";

export const HomeTools = () => {
  return (
    <div>
      <div className="mainDivTools">
        <h1>Software & Tools:</h1>

        <div className="HSTRow">
          <div className="div1">
            <div className="innerDiv">
              <VisualStudioVector />
            </div>
          </div>
          <div className="div1">
            <div className="innerDiv">
              <GitHubVector className="vector80px" />
            </div>
          </div>
          <div className="div1">
            <div className="innerDiv">
              <FigmaVector />
            </div>
          </div>
          <div className="div1">
            <div className="innerDiv">
              <PhotoShopVector />
            </div>
          </div>
          <div className="div1">
            <div className="innerDiv">
              <PostmanVector />
            </div>
          </div>
          <div className="div1">
            <div className="innerDiv">
              <SlackVector />
            </div>
          </div>
          <div className="div1">
            <div className="innerDiv">
              <MicrosoftOfficeVector />
            </div>
          </div>
          <div className="div1">
            <div className="innerDiv">
              <AwsVector />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
