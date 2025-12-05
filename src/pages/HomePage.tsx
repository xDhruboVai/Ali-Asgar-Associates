/**
 * ALI ASGAR & ASSOCIATES - Home Page
 * 
 * Main landing page that combines all homepage sections in order:
 * 1. Header - Navigation bar
 * 2. Hero - Welcome section with CTA
 * 3. Stats - Company statistics
 * 4. About - Company overview
 * 5. Services - Services offered
 * 6. Projects - Portfolio showcase
 * 7. Testimonials - Client feedback
 * 8. Contact - Contact form
 * 9. Footer - Site footer
 * 
 * This page provides a comprehensive overview of the company and its offerings.
 * 
 * @page
 * @module HomePage
 */

import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { About } from "../components/About";
import { Projects } from "../components/Projects";
import { Stats } from "../components/Stats";
import { Testimonials } from "../components/Testimonials";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}