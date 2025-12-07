import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {target}
        {suffix}
      </motion.span>
    </motion.div>
  );
}

export function Stats() {
  const stats = [
    { number: 500, suffix: "+", label: "Projects Completed" },
    { number: 20, suffix: "+", label: "Years of Experience" },
    { number: 50, suffix: "+", label: "Expert Professionals" },
    { number: 100, suffix: "%", label: "Client Satisfaction" },
  ];

  return (
    <section className="py-12 md:py-16 bg-red-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl mb-2 text-white">
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base text-red-100">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}