import { CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function About() {
  const features = [
    "Licensed and certified professionals",
    "Quality materials and construction practices",
    "On-time project delivery",
    "Transparent pricing and communication",
    "Comprehensive warranty coverage",
    "Sustainable building solutions",
  ];

  return (
    <section id="about" className="py-16 md:py-20 bg-[#0a0908]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 text-white">
              ALI ASGAR & ASSOCIATES: Premier Consulting Engineering
            </h2>
            <p className="text-gray-300 mb-6">
              Established in 1999, ALI ASGAR & ASSOCIATES has over 20 years of experience as a leading consulting engineering and planning company in Bangladesh. Led by CEO Md. Ali Asgar, we specialize in comprehensive building solutions from initial architectural concepts to final civil work.
            </p>
            <p className="text-gray-300 mb-8">
              Our team of experienced architects, engineers, and construction professionals work together to deliver projects that exceed expectations. We pride ourselves on our commitment to quality, safety, and customer satisfaction.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-200 text-sm md:text-base">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1695067438561-75492f7b6a9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjQ2MDkxMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern architecture building"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-4 md:-bottom-6 -right-4 md:-right-6 w-32 h-32 md:w-48 md:h-48 bg-red-600 rounded-lg -z-10"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}