import React from "react";
import { nanoid } from "nanoid";
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
        index={5}
        vector={<InProgressVector />}
        title={"Nutrition Web Application (In progress - Freelancing) "}
        text={
          "Web application dedicated to store patient consultation information to determine the type of diet that corresponds to them. Being a tracking tool for the administrator."
        }
        technologies={[
          <div key={nanoid()} className="PCButtonGlow">
            <JSVector className="vector40px" />
          </div>,
          <div key={nanoid()} className="PCButtonGlow">
            <ReactVector className="vector40px" />
          </div>,
          <div key={nanoid()} className="PCButtonGlow">
            <TypescriptVector className="vector40px" />
          </div>,
          <div key={nanoid()} className="PCButtonGlow">
            <HtmlVector className="vector40px" />
          </div>,
          <div key={nanoid()} className="PCButtonGlow">
            <CssVector className="vector40px" />
          </div>,
          <div key={nanoid()} className="PCButtonGlow">
            <NodeJSVector className="vector40px" />
          </div>,
          <div key={nanoid()} className="PCButtonGlow">
            <MySQLVector className="vector40px" />
          </div>,
          <div key={nanoid()} className="PCButtonGlow">
            <ExpressVector className="vector40px" />
          </div>,
        ]}
      />
    </div>
  );
};
