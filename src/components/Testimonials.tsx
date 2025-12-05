import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Ahmed Rahman",
      role: "Business Owner",
      content: "ALI ASGAR & ASSOCIATES transformed our vision into reality. Their attention to detail and professionalism throughout our commercial building project was exceptional. Highly recommended!",
      rating: 5,
    },
    {
      name: "Fatima Khan",
      role: "Homeowner",
      content: "From architectural design to the final touches, they handled everything perfectly. Our dream home was completed on time and within budget. Outstanding work!",
      rating: 5,
    },
    {
      name: "Karim Hossain",
      role: "Property Developer",
      content: "We've partnered with ALI ASGAR & ASSOCIATES on multiple projects. Their expertise in civil construction and project management is unmatched in Bangladesh.",
      rating: 5,
    },
    {
      name: "Nadia Sultana",
      role: "Restaurant Owner",
      content: "They designed and built our restaurant from scratch. The team understood our vision perfectly and delivered a space that our customers love. Professional and reliable!",
      rating: 5,
    },
    {
      name: "Rashid Ahmed",
      role: "Apartment Complex Owner",
      content: "Outstanding structural engineering and construction quality. They completed our 8-story building ahead of schedule while maintaining the highest standards.",
      rating: 5,
    },
    {
      name: "Sadia Begum",
      role: "Homeowner",
      content: "Our home renovation was handled with such care and precision. They respected our budget and timeline, and the results exceeded our expectations!",
      rating: 5,
    },
    {
      name: "Jahangir Alam",
      role: "Commercial Building Owner",
      content: "The architectural design they created for our office building is both functional and beautiful. Their engineering expertise is truly world-class.",
      rating: 5,
    },
    {
      name: "Ayesha Chowdhury",
      role: "Retail Store Owner",
      content: "Professional, punctual, and precise. ALI ASGAR & ASSOCIATES handled our store construction with exceptional attention to detail. Couldn't be happier!",
      rating: 5,
    },
    {
      name: "Mahmud Hassan",
      role: "Factory Owner",
      content: "They built our manufacturing facility with expertise in both civil and industrial construction. Their planning and execution were flawless from start to finish.",
      rating: 5,
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Adjust items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); // Mobile: 1 item
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // Tablet: 2 items
      } else {
        setItemsPerPage(3); // Desktop: 3 items
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000); // Change page every 5 seconds

    return () => clearInterval(timer);
  }, [totalPages]);

  const currentTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section id="testimonials" className="py-16 md:py-20 bg-[#1a1817]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-white">
            What Our Clients Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </motion.div>

        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {currentTestimonials.map((testimonial, index) => (
                  <Card key={`${currentPage}-${index}`} className="border-gray-700 bg-[#2d2623] h-full">
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      <div>
                        <div className="text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex gap-2 justify-center mt-8">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentPage ? "w-8 bg-red-600" : "w-2 bg-gray-600"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}