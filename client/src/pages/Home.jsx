import Description from "../components/Description";
import GenerateBtn from "../components/GenerateBtn";
import Header from "../components/Header";
import Steps from "../components/Steps";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";

const Home = () => {
  return (
    <div>
      <Header></Header>
      <Steps></Steps>
      <Description></Description>
      <Testimonials></Testimonials>
      <FAQ></FAQ>
      <GenerateBtn></GenerateBtn>
    </div>
  );
};

export default Home;
