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
        className="text-3xl md:text-4xl font-black mb-4 text-slate-900 tracking-tight text-center"
      >
        Loved by <span className="text-gradient">creators</span>
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-lg text-slate-500 mb-16 font-medium uppercase tracking-widest text-center"
      >
        What our users are saying
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
        {testimonialsData.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -12, boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.15)" }}
            className="glass-card p-10 rounded-[3rem] group transition-all duration-500 border-2 border-white/50"
          >
            <div className="flex items-center gap-5 mb-8">
              <img
                src={item.image}
                alt=""
                className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg object-cover"
              />
              <div>
                <h2 className="text-xl font-black text-slate-900 leading-tight">{item.name}</h2>
                <p className="text-sm text-indigo-600 font-bold uppercase tracking-tighter">{item.role}</p>
              </div>
            </div>
            <div className="flex gap-1 mb-6">
              {Array(item.stars)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    src={assets.rating_star}
                    alt=""
                    className="w-4 h-4 drop-shadow-sm"
                  />
                ))}
            </div>
            <p className="text-slate-600 leading-relaxed font-medium italic">
              "{item.text}"
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
