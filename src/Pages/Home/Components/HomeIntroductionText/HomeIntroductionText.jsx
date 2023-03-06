import { profileImgVector } from "../../../../Assets/Vectors";
import { TiltComponent } from "../../../../Components/TiltComponent/TiltComponent";
import "./HomeIntroductionText.css";

export const HomeIntroductionText = () => {
  return (
    <div>
      <div className="homeIntroductionDiv">
        <div className="homeIntroductionImage">
          <TiltComponent param={profileImgVector} />
        </div>
        <div className="homeIntroductionDivText color">
          <h1>
            LET ME <span className="homeBlueColor">INTRODUCE </span>
            MYSELF :&#41;
          </h1>
          <div className="homeIntroductionInnerText">
            <ul>
              <p>
                🚀 I'm a dedicated
                <span className="homeBlueColor"> Software Developer </span>
                passionate about{" "}
                <span className="homeBlueColor">
                  Web Development, Data and Automation.
                </span>{" "}
                Always looking for creative ways to increase effciency.
              </p>
              <p>
                ✏️ My main goal is to share all the knowledge I have acquired
                and help anyone that needs it.
              </p>
              <p>📚 I love teaching and learning.</p>
              <p>
                🔎 One of my strengths is that I like to do
                <span className="homeBlueColor"> research </span> until I find
                the answer to any question.
              </p>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h1 className="color">FIND ME ON</h1>
      </div>
    </div>
  );
};
