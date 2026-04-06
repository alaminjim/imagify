import { assets, testimonialsData } from "../../public/images/assets";
import { motion } from "motion/react";

const Testimonials = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="flex flex-col items-center justify-center my-32 p-6"
    >
      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-5xl font-black mb-4 text-slate-900"
      >
        Customer testimonials
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-lg text-slate-500 mb-16"
      >
        What Our Users Are Saying
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {testimonialsData.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="glass-card p-8 rounded-3xl group transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <img
                src={item.image}
                alt=""
                className="w-14 h-14 rounded-full border-2 border-indigo-100"
              />
              <div>
                <h2 className="text-xl font-bold text-slate-900">{item.name}</h2>
                <p className="text-sm text-indigo-600 font-medium">{item.role}</p>
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              {Array(item.stars)
                .fill("")
                .map((item, index) => (
                  <img
                    key={index}
                    src={assets.rating_star}
                    alt=""
                    className="w-4 h-4"
                  />
                ))}
            </div>
            <p className="text-slate-600 leading-relaxed italic">
              "{item.text}"
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
