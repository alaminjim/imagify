import { assets, testimonialsData } from "../../public/images/assets";
import { motion } from "motion/react";

const Testimonials = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-20 py-12"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Customer testimonials
      </h1>
      <p className="text-gray-500 mb-12">What Our Users Are Saying</p>

      <div className="flex flex-wrap gap-6">
        {testimonialsData.map((test, index) => (
          <div
            key={index}
            className="bg-white/20 shadow-md p-12 order w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg"
          >
            <div className="flex flex-col items-center">
              <img src={test.image} alt="" className="rounded-full w-14" />
              <h2 className="text-xl font-medium mt-3">{test.name}</h2>
              <p className="text-gray-500 mb-4">{test.role}</p>
              <div className="flex mb-4">
                {Array(test.stars)
                  .fill()
                  .map((item, index) => (
                    <img key={index} src={assets.rating_star} />
                  ))}
              </div>
              <p className="text-center text-sm text-gray-600">{test.text}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
