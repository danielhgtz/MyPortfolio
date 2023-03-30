import { ProjectComponent } from "../ProjectComponent/ProjectComponent";
import { nanoid } from "nanoid";

import { InProgressVector } from "../../../../../Assets/ProjectVectors/InProgressVector";
import { JSVector } from "../../../../../Assets/SkillsVectors/JSVector";
import { ReactVector } from "../../../../../Assets/SkillsVectors/ReactVector";
import { ViteVector } from "../../../../../Assets/SkillsVectors/ViteVector";
import { TailwindCssVector } from "../../../../../Assets/SkillsVectors/TailwindCssVector";
import { HtmlVector } from "../../../../../Assets/SkillsVectors/HtmlVector";
import { CssVector } from "../../../../../Assets/SkillsVectors/CssVector";
import { NodeJSVector } from "../../../../../Assets/SkillsVectors/NodeJSVector";
import { MySQLVector } from "../../../../../Assets/SkillsVectors/MySQLVector";
import { ExpressVector } from "../../../../../Assets/SkillsVectors/ExpressVector";

import "./ProjectsCSSVectors.css";

export const TwitterCloneApp = () => {
  return (
    <div>
      <ProjectComponent
        index={4}
        vector={<InProgressVector />}
        title={"Twitter Clone App  (In progress) "}
        text={
          "Full stack Twitter Clone App connected to a MySQL DataBase implemented with Vite and Tailwind CSS."
        }
        technologies={[
          <div key={nanoid()} className="PCButtonGlow">
            <JSVector className="vector40px" />
          </div>,
          <div key={nanoid()} className="PCButtonGlow">
            <ReactVector className="vector40px" />
          </div>,
          <div key={nanoid()} className="PCButtonGlow">
            <ViteVector className="vector40px" />
          </div>,
          <div key={nanoid()} className="PCButtonGlow">
            <TailwindCssVector className="vector40px" />
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
        gitHubLink={"https://github.com/danielhgtz/TwitterCloneApp"}
        booleanDemo={false}
      />
    </div>
  );
};
