import React from "react";
import { nanoid } from "nanoid";

import { ProjectComponent } from "../ProjectComponent/ProjectComponent";
import portfolioiImg from "../../../../../Assets/Macbook/IMG_0013.png";
import { Button } from "antd";

import { JSVector } from "../../../../../Assets/SkillsVectors/JSVector";
import { ReactVector } from "../../../../../Assets/SkillsVectors/ReactVector";
import { HtmlVector } from "../../../../../Assets/SkillsVectors/HtmlVector";
import { CssVector } from "../../../../../Assets/SkillsVectors/CssVector";
import { StartVector } from "../../../../../Assets/ProjectVectors/StartVector";

export const Portfolio = () => {
  return (
    <div>
      <ProjectComponent
        index={3}
        image={portfolioiImg}
        title={"Portfolio | Danielhgtz"}
        text={
          "Web application that shows my information, skills, technologies and projects that I have made as a developer."
        }
        technologies={[
          <div key={nanoid()} className="PCButtonGlow">
            <JSVector className="vector40px" />
          </div>,
          <div key={nanoid()} className="PCButtonGlow">
            <ReactVector className="vector40px" />
          </div>,
          <div key={nanoid()} className="PCButtonGlow">
            <HtmlVector className="vector40px" />
          </div>,
          <div key={nanoid()} className="PCButtonGlow">
            <CssVector className="vector40px" />
          </div>,
        ]}
        gitHubLink={"https://github.com/danielhgtz/MyPortafolio"}
        booleanDemo={true}
        demoLink={"/"}
      />
    </div>
  );
};
