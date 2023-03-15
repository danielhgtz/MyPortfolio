import { useEffect } from "react";
import "./HomeProjects.css";
import { AdministrationPallets } from "./Projects/AdministrationPallets";
import { LaborSettlementProject } from "./Projects/LaborSettlement";
import { NutritionApp } from "./Projects/NutritionApp";
import { Planodi } from "./Projects/Planodi";
import { Portfolio } from "./Projects/Portfolio";

export const HomeProjects = ({ homeProjectsRef }) => {
  return (
    <div ref={homeProjectsRef} className="HPDiv">
      <h1 className="color">My recent Projects:</h1>

      <div className="HPContainer">
        <LaborSettlementProject />

        <Planodi />

        <Portfolio />

        <NutritionApp />

        <AdministrationPallets />
      </div>
    </div>
  );
};
