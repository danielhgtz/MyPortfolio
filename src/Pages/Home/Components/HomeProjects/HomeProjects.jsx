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
<<<<<<< HEAD
=======
<<<<<<< HEAD
        <LaborSettlementProject />

        <Planodi />

        <Portfolio />

        <NutritionApp />

        <AdministrationPallets />
=======
>>>>>>> 1de48b3 (fix)
        <div className="HPInnerDiv">
          <div className="HPIndividualDiv">
            <LaborSettlementProject />
          </div>
        </div>
        <div className="HPInnerDiv">
          <div className="HPIndividualDiv">
            <Planodi />
          </div>
        </div>
        <div className="HPInnerDiv">
          <div className="HPIndividualDiv">
            <Portfolio />
          </div>
        </div>
        <div className="HPInnerDiv">
          <div className="HPIndividualDiv">
            <NutritionApp />
          </div>
        </div>
        <div className="HPInnerDiv">
          <div className="HPIndividualDiv">
            <AdministrationPallets />
          </div>
        </div>
<<<<<<< HEAD
=======
>>>>>>> bce94ca7e6de6a92dafbb6ab56e1906b28659e6f
>>>>>>> 1de48b3 (fix)
      </div>
    </div>
  );
};
