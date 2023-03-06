import "./Home.css";
import { HomeMain } from "./Components/HomeMain/HomeMain";
import { HomeIntroductionText } from "./Components/HomeIntroductionText/HomeIntroductionText";

const Home = () => {
  return (
    <div className="container">
      <HomeMain />
      <HomeIntroductionText />
      {/* <IntroductionText /> */}
    </div>
  );
};

export default Home;
