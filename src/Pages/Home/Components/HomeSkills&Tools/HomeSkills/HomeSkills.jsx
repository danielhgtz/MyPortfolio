import React from "react";
import { ReactVector } from "../../../../../Assets/SkillsVectors/ReactVector.jsx";
import { TypescriptVector } from "../../../../../Assets/SkillsVectors/TypescriptVector";
import { JSVector } from "../../../../../Assets/SkillsVectors/JSVector";
import { NodeJS } from "../../../../../Assets/SkillsVectors/NodeJSVector";
import { MySQLVector } from "../../../../../Assets/SkillsVectors/MySQLVector";
import { MongoDBVector } from "../../../../../Assets/SkillsVectors/MongoDBVector";
import { GitVector } from "../../../../../Assets/SkillsVectors/GitVector";
import { ExpressVector } from "../../../../../Assets/SkillsVectors/ExpressVector";
import { HtmlVector } from "../../../../../Assets/SkillsVectors/HtmlVector";
import { CssVector } from "../../../../../Assets/SkillsVectors/CssVector";

import "../HomeSkills&Tools.css";

export const HomeSkills = ({ homeSkillsRef }) => {
  return (
    <div ref={homeSkillsRef} className="mainDivSkills">
      <h1>Professional Skills:</h1>
      <div className="row">
        <div className="div1">
          <div className="innerDiv">
            <ReactVector />
          </div>
        </div>
        <div className="div1">
          <div className="innerDiv">
            <TypescriptVector />
          </div>
        </div>
        <div className="div1">
          <div className="innerDiv">
            <JSVector />
          </div>
        </div>
        <div className="div1">
          <div className="innerDiv">
            <NodeJS />
          </div>
        </div>
        <div className="div1">
          <div className="innerDiv">
            <MySQLVector />
          </div>
        </div>
        <div className="div1">
          <div className="innerDiv">
            <MongoDBVector />
          </div>
        </div>
        <div className="div1">
          <div className="innerDiv">
            <GitVector />
          </div>
        </div>
        <div className="div1">
          <div className="innerDiv">
            <ExpressVector />
          </div>
        </div>
        <div className="div1">
          <div className="innerDiv">
            <HtmlVector />
          </div>
        </div>
        <div className="div1">
          <div className="innerDiv">
            <CssVector />
          </div>
        </div>
      </div>
    </div>
  );
};
