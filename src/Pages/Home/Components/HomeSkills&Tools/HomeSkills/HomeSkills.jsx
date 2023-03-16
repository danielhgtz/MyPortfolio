import React from "react";
import { ReactVector } from "../../../../../Assets/SkillsVectors/ReactVector.jsx";
import { TypescriptVector } from "../../../../../Assets/SkillsVectors/TypescriptVector";
import { JSVector } from "../../../../../Assets/SkillsVectors/JSVector";
import { NodeJSVector } from "../../../../../Assets/SkillsVectors/NodeJSVector";
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
      <div className="HSTRow">
        <div className="div1">
          <div className="innerDiv">
            <ReactVector className="vector80px" />
          </div>
        </div>
        <div className="div1">
          <div className="innerDiv">
            <TypescriptVector className="vector80px" />
          </div>
        </div>
        <div className="div1">
          <div className="innerDiv">
            <JSVector className="vector80px" />
          </div>
        </div>
        <div className="div1">
          <div className="innerDiv">
            <NodeJSVector className="vector120px" />
          </div>
        </div>
        <div className="div1">
          <div className="innerDiv">
            <MySQLVector className="vector140px" />
          </div>
        </div>
        <div className="div1">
          <div className="innerDiv">
            <MongoDBVector className="vector140px" />
          </div>
        </div>
        <div className="div1">
          <div className="innerDiv">
            <GitVector className="vector120px" />
          </div>
        </div>
        <div className="div1">
          <div className="innerDiv">
            <ExpressVector className="vector80px" />
          </div>
        </div>
        <div className="div1">
          <div className="innerDiv">
            <HtmlVector className="vector100px" />
          </div>
        </div>
        <div className="div1">
          <div className="innerDiv">
            <CssVector className="vector80px" />
          </div>
        </div>
      </div>
    </div>
  );
};
