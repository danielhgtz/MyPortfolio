import moment from "moment";
import { Button } from "antd";
import { GitHubWhiteVector } from "../../Assets/SocialVecotors/GitHubWhiteVector";
import { LinkedinVector } from "../../Assets/SocialVecotors/LinkedinVector";
import { navigateTop } from "../../Utilities/Utilities";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footerDiv">
      <h4 className="footerName" onClick={navigateTop}>
        Danielhgtz {moment().year()}
      </h4>
      <div className="footerSocialLinks">
        <Button
          size="large"
          className="github footerSpaceBetween"
          shape="circle"
          icon={<GitHubWhiteVector />}
          href="https://github.com/danielhgtz"
        />
        <Button
          size="large"
          className="linkedin footerSpaceBetween"
          shape="circle"
          icon={<LinkedinVector />}
          href="https://www.linkedin.com/in/danielhgtz/"
        />
      </div>
    </div>
  );
};
