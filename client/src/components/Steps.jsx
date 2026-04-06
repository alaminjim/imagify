import { stepsData } from "../../public/images/assets";
import { motion } from "motion/react";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      className="flex flex-col items-center justify-center my-32"
    >
      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-5xl font-black mb-4 text-slate-900"
      >
        How it works
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-lg text-slate-500 mb-12"
      >
        Transform Words Into Stunning Images
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {stepsData.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="glass-card p-8 rounded-3xl group cursor-pointer hover:border-indigo-500/30 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 border border-indigo-100 group-hover:bg-indigo-600 transition-colors">
              <img
                width={32}
                src={item.icon}
                alt=""
                className="group-hover:invert transition-all"
              />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {item.title}
            </h2>
            <p className="text-slate-500 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

export default Steps;
