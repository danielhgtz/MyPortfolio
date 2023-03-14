import { ProjectComponent } from "../ProjectComponent/ProjectComponent";
import laborSettlementImg from "../../../../../Assets/Macbook/IMG_0015.png";

import { JSVector } from "../../../../../Assets/SkillsVectors/JSVector";
import { ReactVector } from "../../../../../Assets/SkillsVectors/ReactVector";
import { TypescriptVector } from "../../../../../Assets/SkillsVectors/TypescriptVector";
import { HtmlVector } from "../../../../../Assets/SkillsVectors/HtmlVector";
import { CssVector } from "../../../../../Assets/SkillsVectors/CssVector";
import { NodeJSVector } from "../../../../../Assets/SkillsVectors/NodeJSVector";
import { MongoDBVector } from "../../../../../Assets/SkillsVectors/MongoDBVector";
import { ExpressVector } from "../../../../../Assets/SkillsVectors/ExpressVector";

export const LaborSettlementProject = () => {
  return (
    <div>
      <ProjectComponent
        image={laborSettlementImg}
        title={"Labor Settlement Calculator App"}
        text={
          "Web application that calculates the exact amount to be paid when the labor relationship between an  employer and an employee ends based on Mexican regulations (Federal Labor Law)."
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
            <MongoDBVector className="vector40px" />
          </button>,
          <button className="PCButtonGlow">
            <ExpressVector className="vector40px" />
          </button>,
        ]}
        gitHubLink={
          "https://github.com/danielhgtz/LaborSettlementCalculatorApp"
        }
        booleanDemo={true}
      />
    </div>
  );
};
