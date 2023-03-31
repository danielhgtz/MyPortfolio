import { HomeIntroductionTiltComponent } from "../../../../Components/TiltComponent/TiltComponent";
import { Button } from "antd";
import { LinkedinVector } from "../../../../Assets/SocialVecotors/LinkedinVector";
import { GitHubWhiteVector } from "../../../../Assets/SocialVecotors/GitHubWhiteVector";
import personalImage from "../../../../Assets/PersonalImages/personalImage2.jpg";

import "./HomeIntroductionText.css";

export const HomeIntroductionText = ({ homeAboutRef }) => {
  return (
    <div ref={homeAboutRef} className="HomeIntroductionTextColor">
      <div className="centerFirstDiv">
        <h1 style={{ paddingBottom: "30px", marginTop: "10px" }}>
          LET ME <span className="blueColor">INTRODUCE </span>
          MYSELF :&#41;
        </h1>
      </div>
      <div className="homeIntroductionDiv">
        <div className="divImage">
          <HomeIntroductionTiltComponent
            className={"tiltComponentOverraide"}
            paramImg={personalImage}
          />
        </div>
        <div className="divText">
          <ul className="homeIntroductionUL">
            <p>
              🚀 I'm a dedicated
              <span className="blueColor"> Software Developer </span>
              passionate about{" "}
              <span className="blueColor">
                Web Development, Data and Automation.
              </span>{" "}
              Always looking for creative ways to increase effciency.
            </p>
            <p>
              ✏️ My main goal is to share all the knowledge I have acquired and
              help anyone that needs it.
            </p>
            <p>📚 I love teaching and learning.</p>
            <p>
              🔎 One of my strengths is that I like to do
              <span className="blueColor"> research </span> until I find the
              answer to any question.
            </p>
          </ul>
        </div>
      </div>
      <div className="socialDiv">
        <h3 className="socialTitle">FIND ME ON:</h3>
        <div className="socialLinks">
          <Button
            size="large"
            className="github"
            shape="circle"
            icon={<GitHubWhiteVector />}
            href="https://github.com/danielhgtz"
          />
          <Button
            size="large"
            className="linkedin"
            shape="circle"
            icon={<LinkedinVector />}
            href="https://www.linkedin.com/in/danielhgtz/"
          />
        </div>
      </div>
      <div className="connectionText">
        <p>
          Feel free to <span className="blueColor">connect</span> with me :&#41;
        </p>
      </div>
    </div>
  );
};
