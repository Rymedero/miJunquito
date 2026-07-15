import HeroJunquito from "./components/HeroJunquito";
import Category from "./components/Category";
import Featuredbusinesses from "./components/Featuredbusinesses";

function Landing() {
  return (
    <div>
      <HeroJunquito />
      <div className="">
        <Category />
      </div>
    <div className="">
        <Featuredbusinesses />
      </div>
    </div>
  );
}

export default Landing;
