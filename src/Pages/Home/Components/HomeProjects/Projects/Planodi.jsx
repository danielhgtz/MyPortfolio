import React from "react";
import { nanoid } from "nanoid";

import { ProjectComponent } from "../ProjectComponent/ProjectComponent";
import planodiImg from "../../../../../Assets/Macbook/IMG_0014.png";

import { JSVector } from "../../../../../Assets/SkillsVectors/JSVector";
import { ReactVector } from "../../../../../Assets/SkillsVectors/ReactVector";
import { TypescriptVector } from "../../../../../Assets/SkillsVectors/TypescriptVector";
import { HtmlVector } from "../../../../../Assets/SkillsVectors/HtmlVector";
import { CssVector } from "../../../../../Assets/SkillsVectors/CssVector";
import { NodeJSVector } from "../../../../../Assets/SkillsVectors/NodeJSVector";
import { MySQLVector } from "../../../../../Assets/SkillsVectors/MySQLVector";
import { ExpressVector } from "../../../../../Assets/SkillsVectors/ExpressVector";
import { useNavigate } from "react-router-dom";

export const Planodi = () => {
  const navigate = useNavigate();

  const navigatePlanodi = () => {
    navigate("./Planodi");
  };
  return (
    <div>
      <ProjectComponent
        index={2}
        image={planodiImg}
        title={"Planodi (Startup)"}
        text={
          "Collaboration in a startup dedicated to connect service providers with the end customer through a web platform. The goal is that people can compare and decide the best possible option for their event, creating it in a few clicks."
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
        gitHubLink={"https://github.com/EstebanPerez99/planodi"}
        booleanDemo={true}
        demoLinkFx={navigatePlanodi}
      />
    </div>
  );
};
