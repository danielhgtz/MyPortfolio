import React, { useEffect } from "react";
import { matchPath, useNavigate, useLocation } from "react-router-dom";
import { nanoid } from "nanoid";

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
  const navigate = useNavigate();

  const navigateLSA = () => {
    navigate("./LaborSettlement");
  };

  return (
    <div>
      <ProjectComponent
        image={laborSettlementImg}
        title={"Labor Settlement Calculator App"}
        text={
          "Web application that calculates the exact amount to be paid when the labor relationship between an  employer and an employee ends based on Mexican regulations (Federal Labor Law)."
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
            <MongoDBVector className="vector40px" />
          </div>,
          <div key={nanoid()} className="PCButtonGlow">
            <ExpressVector className="vector40px" />
          </div>,
        ]}
        gitHubLink={
          "https://github.com/danielhgtz/LaborSettlementCalculatorApp"
        }
        booleanDemo={true}
        demoLinkFx={navigateLSA}
      />
    </div>
  );
};

// useEffect(() => {
//   if (
//     document.body.style.backgroundImage !==
//     "linear-gradient(90deg, #f8d5c6, #2e537c)"
//   ) {
//     document.body.style.backgroundImage =
//       "linear-gradient(90deg, #f8d5c6, #2e537c)";
//   } else {
//     document.body.style.background = "black";
//   }
// }, []);

// const ACCOUNT_PORTAL_PATHS = ["/", "/Resume", "/LaborSettlement"];

// const { pathname } = useLocation();
// const isMatch = ACCOUNT_PORTAL_PATHS.some((path) =>
//   matchPath(path, pathname)
// );

// useEffect(() => {
//   console.log({ pathname, isMatch });
// }, []);
