import Description from "../components/Description";
import GenerateBtn from "../components/GenerateBtn";
import Header from "../components/Header";
import Steps from "../components/Steps";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div>
      <Header></Header>
      <Steps></Steps>
      <Description></Description>
      <Testimonials></Testimonials>
      <GenerateBtn></GenerateBtn>
    </div>
  );
};

export default Home;
