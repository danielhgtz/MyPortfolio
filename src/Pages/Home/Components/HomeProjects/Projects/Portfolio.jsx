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
        image={portfolioiImg}
        title={"Portfolio"}
        text={
          "Web application that shows my information, skills, technologies and projects that I have made as a developer."
        }
        technologies={[
          <button className="PCButtonGlow">
            <JSVector className="vector40px" />
          </button>,
          <button className="PCButtonGlow">
            <ReactVector className="vector40px" />
          </button>,
          <button className="PCButtonGlow">
            <HtmlVector className="vector40px" />
          </button>,
          <button className="PCButtonGlow">
            <CssVector className="vector40px" />
          </button>,
        ]}
        gitHubLink={"https://github.com/danielhgtz/MyPortafolio"}
        booleanDemo={true}
        demoLink={"/"}
      />
    </div>
  );
};
