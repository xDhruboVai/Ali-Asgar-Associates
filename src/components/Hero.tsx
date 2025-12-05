import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const heroSlides = [
  {
    title: "Building Dreams into Reality",
    description: "Expert consulting engineering and planning services from architectural design to civil construction across Bangladesh",
    image: "https://images.unsplash.com/photo-1684596423225-d9eda48e888e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBidWlsZGluZyUyMHNpdGV8ZW58MXx8fHwxNzY0NjEyMTU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    title: "Excellence in Engineering",
    description: "Transforming innovative designs into exceptional structures with precision and dedication since 1999",
    image: "https://images.unsplash.com/photo-1630259970029-7b1e1160243e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBidWlsZGluZyUyMHNpdGV8ZW58MXx8fHwxNzY0NzM3MTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    title: "Creating Tomorrow's Landmarks",
    description: "Comprehensive building solutions from concept to completion for residential and commercial projects",
    image: "https://images.unsplash.com/photo-1695067438561-75492f7b6a9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjQ3MTk1Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    title: "Where Vision Meets Construction",
    description: "Delivering sustainable and innovative engineering solutions with unmatched quality and professionalism",
    image: "https://images.unsplash.com/photo-1638207849658-e57be0cdc208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXZpbCUyMGVuZ2luZWVyaW5nJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc2NDY4NzIyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    title: "Designing the Future Today",
    description: "Your trusted partner in architectural excellence and comprehensive construction management",
    image: "https://images.unsplash.com/photo-1622120573004-c70648f2352e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZGVzaWduJTIwbW9kZXJufGVufDF8fHx8MTc2NDc3NTk0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1, rotateY: 10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.95, rotateY: -10 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70"></div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-white z-10">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 text-left leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {heroSlides[currentSlide].title}
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-200 text-left leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {heroSlides[currentSlide].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-600/50 transition-all duration-300 w-full sm:w-auto"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => {
                const element = document.getElementById("projects");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 shadow-lg transition-all duration-300 w-full sm:w-auto"
            >
              View Projects
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators - Bottom Center */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-12 bg-red-500" : "w-8 bg-white/50"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}