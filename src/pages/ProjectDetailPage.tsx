/**
 * ALI ASGAR & ASSOCIATES - Project Detail Page
 * 
 * Displays comprehensive information about a single project including:
 * - Hero image with project title
 * - Project specifications (client, year, area, duration)
 * - Full description
 * - Challenges and solutions
 * - Image gallery
 * - Key features list
 * - Call-to-action button to contact
 * 
 * This page provides an in-depth look at individual projects from
 * the company's portfolio.
 * 
 * @page
 * @module ProjectDetailPage
 */

import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { projectsData } from "../data/projectsData";
import { ImageWithFallback } from "../components/ui/image-with-fallback";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowLeft, MapPin, Calendar, User, Maximize, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl mb-4 text-white">Project Not Found</h1>
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactClick = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleBackToProjects = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("projects");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>

        <div className="relative container mx-auto px-4 text-white z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <Badge className="bg-red-600 mb-4">{project.type}</Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl mb-4">{project.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{project.year}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Info Cards */}
      <section className="py-12 md:py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 md:p-6 text-center">
                  <User className="h-8 w-8 text-red-500 mx-auto mb-3" />
                  <div className="text-xs md:text-sm text-gray-400 mb-1">Client</div>
                  <div className="text-sm md:text-base break-words text-white">{project.client}</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 md:p-6 text-center">
                  <Maximize className="h-8 w-8 text-red-500 mx-auto mb-3" />
                  <div className="text-xs md:text-sm text-gray-400 mb-1">Area</div>
                  <div className="text-sm md:text-base text-white">{project.area}</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 md:p-6 text-center">
                  <Clock className="h-8 w-8 text-red-500 mx-auto mb-3" />
                  <div className="text-xs md:text-sm text-gray-400 mb-1">Duration</div>
                  <div className="text-sm md:text-base text-white">{project.duration}</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 md:p-6 text-center">
                  <Calendar className="h-8 w-8 text-red-500 mx-auto mb-3" />
                  <div className="text-xs md:text-sm text-gray-400 mb-1">Completed</div>
                  <div className="text-sm md:text-base text-white">{project.year}</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12 md:py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl mb-4 text-white">Project Overview</h2>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {project.fullDescription}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-3xl mb-4 text-white">The Challenge</h2>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {project.challenges}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl md:text-3xl mb-4 text-white">Our Solution</h2>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {project.solution}
                </p>
              </motion.div>

              {/* Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl md:text-3xl mb-6 text-white">Project Gallery</h2>
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  {project.gallery.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="aspect-video rounded-lg overflow-hidden shadow-lg"
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${project.title} gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl md:text-2xl mb-6 text-white">Key Features</h3>
                    <ul className="space-y-3">
                      {project.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: false, amount: 0.2 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm md:text-base">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-red-600 text-white border-red-500">
                  <CardContent className="p-6">
                    <h3 className="text-xl md:text-2xl mb-4">Start Your Project</h3>
                    <p className="mb-6 text-red-100 text-sm md:text-base">
                      Have a similar project in mind? Let's discuss how we can bring your vision to life.
                    </p>
                    <Button onClick={handleContactClick} className="w-full bg-white text-red-600 hover:bg-gray-100">
                      Contact Us
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}