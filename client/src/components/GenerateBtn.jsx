import { assets } from "../../public/images/assets";

const GenerateBtn = () => {
  return (
    <div className="pb-16 text-center">
      <h2 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-medium text-neutral-800 py-4 md:py-6">
        See the magic. Try now
      </h2>
      <button className="inline-flex items-center gap-2 px-12 py-4 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500">
        Generate Images <img className="w-6" src={assets.star_group} alt="" />
      </button>
    </div>
  );
};

export default GenerateBtn;
