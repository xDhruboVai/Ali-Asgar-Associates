/**
 * ALI ASGAR & ASSOCIATES - Category Page
 * 
 * Displays all projects within a specific category with:
 * - Full-screen image slideshow
 * - Grid view of all projects in the category
 * - Individual project cards with details
 * - Navigation back to home
 * 
 * The slideshow automatically transitions between projects every 5 seconds
 * and supports manual navigation via arrow buttons and keyboard controls.
 * 
 * Features:
 * - Auto-playing slideshow with manual controls
 * - Touch gesture support for mobile
 * - Keyboard navigation (arrow keys)
 * - Responsive grid layout
 * - Smooth animations
 * 
 * @page
 * @module CategoryPage
 */

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Users, ChevronLeft, ChevronRight, Ruler } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { projectsData, categories } from "../data/projectsData";
import { ImageWithFallback } from "../components/ui/image-with-fallback";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

interface Category {
  id: string;
  title: string;
  description: string;
}

interface Project {
  id: string;
  title: string;
  location: string;
  type: string;
  category: string;
  image: string;
  description: string;
  fullDescription: string;
  year: string;
  client: string;
  area: string;
  duration: string;
  gallery: string[];
  features: string[];
  challenges: string;
  solution: string;
}

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    if (!categoryId) return;

    // Find category
    const foundCategory = categories.find((c) => c.id === categoryId);
    setCategory(foundCategory || null);

    // Filter projects for this category
    const filteredProjects = projectsData.filter(p => p.category === categoryId);
    setProjects(filteredProjects);
  }, [categoryId]);

  // Reset gallery index when project changes
  useEffect(() => {
    setGalleryIndex(0);
  }, [selectedIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextGalleryImage();
    }
    if (isRightSwipe) {
      prevGalleryImage();
    }
  };

  if (!category || projects.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl mb-4 text-white">Category Not Found</h1>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBackToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentProject = projects[selectedIndex];

  const nextProject = () => {
    setSelectedIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setSelectedIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const nextGalleryImage = () => {
    setGalleryIndex((prev) => (prev + 1) % currentProject.gallery.length);
  };

  const prevGalleryImage = () => {
    setGalleryIndex((prev) => (prev - 1 + currentProject.gallery.length) % currentProject.gallery.length);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[30vh] sm:h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={projects[0].image}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>
        </div>

        <div className="relative container mx-auto px-4 text-white z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button
              onClick={handleBackToProjects}
              variant="outline"
              size="sm"
              className="mb-4 sm:mb-6 border-white text-white hover:bg-white hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4 leading-tight">{category.title}</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl">
              {category.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Slideshow Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Project Counter and Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-6 sm:mb-8"
          >
            <p className="text-gray-400 text-sm mb-2">
              Project {selectedIndex + 1} of {projects.length}
            </p>
            <div className="flex justify-center gap-2 mb-4 sm:mb-6">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedIndex(idx);
                  }}
                  className={`h-1 rounded-full transition-all duration-300 ${idx === selectedIndex ? "w-12 bg-red-500" : "w-8 bg-gray-700"
                    }`}
                />
              ))}
            </div>

            {/* Project Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Button
                onClick={prevProject}
                variant="outline"
                size="lg"
                className="border-gray-700 text-white hover:bg-gray-800 w-full sm:w-auto"
              >
                <ChevronLeft className="sm:mr-2 h-5 w-5" />
                <span className="hidden sm:inline">Previous Project</span>
                <span className="sm:hidden">Previous</span>
              </Button>
              <Button
                onClick={nextProject}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
              >
                <span className="hidden sm:inline">Next Project</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="sm:ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
            {/* Left: Main Image Slideshow */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedIndex}-${galleryIndex}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
                >
                  <ImageWithFallback
                    src={currentProject.gallery[galleryIndex] || currentProject.image}
                    alt={`${currentProject.title} - Image ${galleryIndex + 1}`}
                    className="w-full h-full object-cover"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Gallery Navigation */}
                  {currentProject.gallery.length > 1 && (
                    <>
                      <button
                        onClick={prevGalleryImage}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                      </button>
                      <button
                        onClick={nextGalleryImage}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                      </button>
                    </>
                  )}

                  {/* Gallery Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                    {galleryIndex + 1} / {currentProject.gallery.length}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Gallery Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {currentProject.gallery.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setGalleryIndex(idx)}
                    className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all touch-manipulation ${idx === galleryIndex
                      ? "ring-2 ring-red-500 scale-105"
                      : "opacity-60 hover:opacity-100"
                      }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Project Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <Badge className="bg-red-600 mb-3">{currentProject.type}</Badge>
                  <h2 className="text-3xl md:text-4xl text-white mb-3">
                    {currentProject.title}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{currentProject.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{currentProject.year}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 text-center">
                      <Users className="h-5 w-5 text-red-500 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-1">Client</p>
                      <p className="text-sm text-white">{currentProject.client.split(' ')[0]}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 text-center">
                      <Ruler className="h-5 w-5 text-red-500 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-1">Area</p>
                      <p className="text-sm text-white">{currentProject.area.split(' ')[0]}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Project Description */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg text-white mb-3">Project Overview</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {currentProject.fullDescription}
                    </p>

                    <h3 className="text-lg text-white mb-3">The Challenge</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {currentProject.challenges}
                    </p>

                    <h3 className="text-lg text-white mb-3">Our Solution</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {currentProject.solution}
                    </p>
                  </CardContent>
                </Card>

                {/* Key Features */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg text-white mb-4">Key Features</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {currentProject.features.slice(0, 6).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}