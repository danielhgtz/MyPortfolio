import { ProjectComponent } from "../ProjectComponent/ProjectComponent";

import { InProgressVector } from "../../../../../Assets/ProjectVectors/InProgressVector";
import { JSVector } from "../../../../../Assets/SkillsVectors/JSVector";
import { ReactVector } from "../../../../../Assets/SkillsVectors/ReactVector";
import { TypescriptVector } from "../../../../../Assets/SkillsVectors/TypescriptVector";
import { HtmlVector } from "../../../../../Assets/SkillsVectors/HtmlVector";
import { CssVector } from "../../../../../Assets/SkillsVectors/CssVector";
import { NodeJSVector } from "../../../../../Assets/SkillsVectors/NodeJSVector";
import { MySQLVector } from "../../../../../Assets/SkillsVectors/MySQLVector";
import { ExpressVector } from "../../../../../Assets/SkillsVectors/ExpressVector";

import "./ProjectsCSSVectors.css";

export const AdministrationPallets = () => {
  return (
    <div>
      <ProjectComponent
        vector={<InProgressVector />}
        title={
          "Administration Pallets for Tarimas Santa Anita, S.A. de C.V.  (In progress - Freelancing) "
        }
        text={
          "Web application dedicated to manage the invoice company information of Tarimas Santa Anita, S.A. de C.V."
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
