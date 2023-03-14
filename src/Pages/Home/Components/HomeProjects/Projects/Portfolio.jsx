import { ProjectComponent } from "../ProjectComponent/ProjectComponent";
<<<<<<< HEAD
=======
<<<<<<< HEAD
import portfolioiImg from "../../../../../Assets/Macbook/IMG_0013.png";
import { Button } from "antd";

import { JSVector } from "../../../../../Assets/SkillsVectors/JSVector";
import { ReactVector } from "../../../../../Assets/SkillsVectors/ReactVector";
import { HtmlVector } from "../../../../../Assets/SkillsVectors/HtmlVector";
import { CssVector } from "../../../../../Assets/SkillsVectors/CssVector";
import { StartVector } from "../../../../../Assets/ProjectVectors/StartVector";
=======
>>>>>>> bce94ca7e6de6a92dafbb6ab56e1906b28659e6f
>>>>>>> 1de48b3 (fix)

export const Portfolio = () => {
  return (
    <div>
      <ProjectComponent
<<<<<<< HEAD
        image={"Imagen"}
=======
<<<<<<< HEAD
        image={portfolioiImg}
=======
        image={"Imagen"}
>>>>>>> bce94ca7e6de6a92dafbb6ab56e1906b28659e6f
>>>>>>> 1de48b3 (fix)
        title={"Portfolio"}
        text={
          "Web application that shows my information, skills, technologies and projects that I have made as a developer."
        }
<<<<<<< HEAD
        technologies={"Javascript | React.js | C.S.S. "}
=======
<<<<<<< HEAD
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
=======
        technologies={"Javascript | React.js | C.S.S. "}
>>>>>>> bce94ca7e6de6a92dafbb6ab56e1906b28659e6f
>>>>>>> 1de48b3 (fix)
      />
    </div>
  );
};
