import { stepsData } from "../../public/images/assets";
import { motion } from "motion/react";

const Steps = () => {
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
        className="text-3xl md:text-4xl font-black mb-4 text-slate-900"
      >
        How it <span className="text-gradient">works</span>
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-lg text-slate-500 mb-12 font-medium"
      >
        Transform Words Into Stunning Images
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {stepsData.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.15)" }}
            className="glass-card p-10 rounded-[3rem] group cursor-pointer transition-all duration-500"
          >
            <div className="w-20 h-20 bg-indigo-50/50 rounded-3xl flex items-center justify-center mb-8 border border-indigo-100 group-hover:bg-indigo-600 group-hover:shadow-2xl group-hover:shadow-indigo-500/40 transition-all duration-500">
              <img
                width={40}
                src={item.icon}
                alt=""
                className="group-hover:invert transition-all duration-500"
              />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
              {item.title}
            </h2>
            <p className="text-slate-500 leading-relaxed font-medium">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
