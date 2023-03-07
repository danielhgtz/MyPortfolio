import { Button } from "antd";
import {
  gitHubVector,
  linkedinVector,
} from "../../Assets/SocialVecotors/SocialsVectors";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footerDiv">
      <h4>Danielhgtz 2023 </h4>
      <Button
        size="large"
        className="github"
        shape="circle"
        icon={gitHubVector}
        href="https://github.com/danielhgtz"
      />
      <Button
        size="large"
        className="linkedin"
        shape="circle"
        icon={linkedinVector}
        href="https://www.linkedin.com/in/danielhgtz/"
      />
    </div>
  );
};
