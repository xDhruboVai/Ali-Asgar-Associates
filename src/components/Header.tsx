import { useState, useEffect } from "react";
import { Building2, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      // Close mobile menu when scrolling
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      // Close mobile menu when resizing to desktop
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    // If not on home page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };
  
  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0a0908]/95 backdrop-blur-sm shadow-md shadow-red-900/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 flex-shrink-0" />
            <div className="text-white">
              <div className="text-sm sm:text-lg md:text-xl leading-tight">ALI ASGAR & ASSOCIATES</div>
              <div className="text-xs sm:text-sm text-[#D4C5B9] leading-tight">Consulting Engineering & Planning</div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-200 hover:text-red-500 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-gray-200 hover:text-red-500 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-gray-200 hover:text-red-500 transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-gray-200 hover:text-red-500 transition-colors"
            >
              Testimonials
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Contact Us
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors touch-manipulation"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3">
            <button
              onClick={() => scrollToSection("about")}
              className="text-left text-gray-200 hover:text-red-500 transition-colors py-2 px-3 rounded-lg hover:bg-white/5 touch-manipulation"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-left text-gray-200 hover:text-red-500 transition-colors py-2 px-3 rounded-lg hover:bg-white/5 touch-manipulation"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-left text-gray-200 hover:text-red-500 transition-colors py-2 px-3 rounded-lg hover:bg-white/5 touch-manipulation"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-left text-gray-200 hover:text-red-500 transition-colors py-2 px-3 rounded-lg hover:bg-white/5 touch-manipulation"
            >
              Testimonials
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-red-600 hover:bg-red-700 text-white w-full touch-manipulation"
            >
              Contact Us
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}