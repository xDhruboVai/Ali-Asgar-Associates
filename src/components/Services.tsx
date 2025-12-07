import { Ruler, HardHat, Hammer, PaintBucket, Building, Lightbulb } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { motion } from "motion/react";

export function Services() {
  const services = [
    {
      icon: Ruler,
      title: "Architectural Design",
      description: "Innovative and functional architectural designs tailored to your vision and requirements.",
    },
    {
      icon: Building,
      title: "Structural Engineering",
      description: "Expert structural analysis and engineering for safe, durable buildings.",
    },
    {
      icon: HardHat,
      title: "Civil Construction",
      description: "Complete civil construction services from foundation to finishing.",
    },
    {
      icon: Hammer,
      title: "Renovation & Remodeling",
      description: "Transform existing spaces with our professional renovation services.",
    },
    {
      icon: PaintBucket,
      title: "Interior & Finishing",
      description: "High-quality interior work and finishing touches for your project.",
    },
    {
      icon: Lightbulb,
      title: "Project Consultation",
      description: "Expert guidance and consultation throughout your construction journey.",
    },
  ];

  return (
    <section id="services" className="py-16 md:py-20 bg-[#1a1817]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-white">
            Our Services
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            We offer comprehensive construction solutions covering every aspect of building from concept to completion
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="border-gray-700 bg-[#1a1817] hover:shadow-lg hover:shadow-red-900/20 transition-shadow h-full">
                <CardContent className="p-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    className="w-14 h-14 bg-red-900/30 rounded-lg flex items-center justify-center mb-4"
                  >
                    <service.icon className="h-7 w-7 text-[#D4C5B9]" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl mb-3 text-white">{service.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}