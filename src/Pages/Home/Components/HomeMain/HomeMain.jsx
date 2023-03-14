import "./HomeMain.css";
import ReactRotatingText from "react-rotating-text";
import { TiltComponent } from "../../../../Components/TiltComponent/TiltComponent";
import personalImage from "../../../../Assets/PersonalImages/personalImage1.jpg";

export const HomeMain = () => {
  return (
    <div className="homeDivRow">
      <div className="homeDivMessage">
        <h1>Hey there!</h1>
        <h1>
          I'M <span className="homeBlueColor">DANIEL</span>
        </h1>
        <ReactRotatingText
          color={"rgb(0, 128, 255)"}
          items={[
            "Front-end Developer",
            "Back-end Developer",
            "Full Stack Developer",
            "Corporate Lawyer",
          ]}
        />
      </div>
      <div className="homeDivProfilePicture">
        <TiltComponent
          className={"tiltComponentMain"}
          paramImg={personalImage}
        />
      </div>
    </div>
  );
};
