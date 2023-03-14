import { InProgressVector } from "../../../../../Assets/ProjectVectors/InProgressVector";
import { ProjectComponent } from "../ProjectComponent/ProjectComponent";

import { JSVector } from "../../../../../Assets/SkillsVectors/JSVector";
import { ReactVector } from "../../../../../Assets/SkillsVectors/ReactVector";
import { TypescriptVector } from "../../../../../Assets/SkillsVectors/TypescriptVector";
import { HtmlVector } from "../../../../../Assets/SkillsVectors/HtmlVector";
import { CssVector } from "../../../../../Assets/SkillsVectors/CssVector";
import { NodeJSVector } from "../../../../../Assets/SkillsVectors/NodeJSVector";
import { MySQLVector } from "../../../../../Assets/SkillsVectors/MySQLVector";
import { ExpressVector } from "../../../../../Assets/SkillsVectors/ExpressVector";

export const NutritionApp = () => {
  return (
    <div>
      <ProjectComponent
        vector={<InProgressVector />}
        title={"Nutrition Web Application (In progress - Freelancing) "}
        text={
          "Web application dedicated to store patient consultation information to determine the type of diet that corresponds to them. Being a tracking tool for the administrator."
        }
        technologies={[
          <button className="PCButtonGlow">
            <JSVector className="vector40px" />
          </button>,
          <button className="PCButtonGlow">
            <ReactVector className="vector40px" />
          </button>,
          <button className="PCButtonGlow">
            <TypescriptVector className="vector40px" />
          </button>,
          <button className="PCButtonGlow">
            <HtmlVector className="vector40px" />
          </button>,
          <button className="PCButtonGlow">
            <CssVector className="vector40px" />
          </button>,
          <button className="PCButtonGlow">
            <NodeJSVector className="vector40px" />
          </button>,
          <button className="PCButtonGlow">
            <MySQLVector className="vector40px" />
          </button>,
          <button className="PCButtonGlow">
            <ExpressVector className="vector40px" />
          </button>,
        ]}
      />
    </div>
  );
};
