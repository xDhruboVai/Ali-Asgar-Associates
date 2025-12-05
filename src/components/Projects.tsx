/**
 * ALI ASGAR & ASSOCIATES - Projects Section Component
 * 
 * This component displays the homepage projects section with category cards.
 * Each card features an interactive slideshow on hover/tap that cycles through
 * projects within that category.
 * 
 * Features:
 * - Automatic image slideshow on hover (desktop) or tap (mobile)
 * - Progress indicators showing current project
 * - Smooth animations and transitions
 * - Responsive design for all screen sizes
 * - Links to individual category pages
 * 
 * @component
 * @module Projects
 */

import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { projectsData, Project, categories } from "../data/projectsData";

interface Category {
  id: string;
  title: string;
  description: string;
}

/**
 * CategoryCard Component
 * 
 * Displays a single category card with hover slideshow functionality.
 * On hover (desktop) or tap (mobile), cycles through all projects in the category.
 * 
 * @param {Category} category - The category information to display
 * @param {Project[]} projects - Array of projects belonging to this category
 */
function CategoryCard({ category, projects }: { category: Category; projects: Project[] }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll slideshow when hovered
  useEffect(() => {
    if (!isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [isHovered, projects.length]);

  // Reset when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentIndex(0);
  };
  
  // Handle touch/click for mobile
  const handleInteraction = () => {
    if (window.innerWidth < 768) {
      // On mobile, toggle the slideshow on tap
      setIsHovered(!isHovered);
    } else {
      // On desktop, mouse enter already handled
      setIsHovered(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => window.innerWidth >= 768 && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleInteraction}
    >
      <Link to={`/category/${category.id}`}>
        <Card className="overflow-hidden hover:shadow-xl hover:shadow-red-900/20 transition-all duration-300 h-full group cursor-pointer border-gray-700 bg-[#1a1817]">
          <div className="aspect-video overflow-hidden relative bg-gray-800">
            <AnimatePresence mode="wait">
              <motion.div
                key={isHovered ? currentIndex : "default"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <ImageWithFallback
                  src={isHovered && projects[currentIndex]?.gallery?.[0] ? projects[currentIndex].gallery[0] : (projects[0]?.gallery?.[0] || '')}
                  alt={isHovered ? projects[currentIndex]?.title : category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            {/* Progress indicators - only show when hovering */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-4 left-4 right-4 flex gap-1"
              >
                {projects.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? "bg-red-500" : "bg-white/30"
                    }`}
                  />
                ))}
              </motion.div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <AnimatePresence mode="wait">
                {isHovered && projects[currentIndex] ? (
                  <motion.div
                    key="hovered"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Badge className="bg-red-600 mb-2">{category.title}</Badge>
                    <h3 className="text-xl md:text-2xl mb-1">{projects[currentIndex].title}</h3>
                    <p className="text-sm text-gray-300">{projects[currentIndex].location}</p>
                  </motion.div>
                ) : projects[0] ? (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Badge className="bg-red-600 mb-2">{category.title}</Badge>
                    <h3 className="text-xl md:text-2xl">{category.title}</h3>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
          
          <CardContent className="p-4 md:p-6 bg-[#1a1817]">
            <p className="text-gray-400 text-sm md:text-base">
              {category.description}
            </p>
            <div className="mt-3 flex items-center text-[#D4C5B9] text-sm">
              <span>View all {projects.length} projects →</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export function Projects() {
  // Use hardcoded data directly
  const allProjects = projectsData;
  const allCategories = categories;

  return (
    <section id="projects" className="py-16 md:py-20 bg-[#0a0908]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-white">
            Our Projects
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Explore our portfolio of successfully completed projects across Bangladesh
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {allCategories.map((category, index) => (
            <div key={category.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <CategoryCard category={category} projects={allProjects.filter(project => project.category === category.id)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}