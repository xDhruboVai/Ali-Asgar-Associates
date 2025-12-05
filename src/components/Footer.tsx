import { Building2, Facebook, Linkedin, MapPin, Mail } from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-8 w-8 text-red-600" />
              <div>
                <div className="text-lg leading-tight">ALI ASGAR & ASSOCIATES</div>
                <div className="text-xs text-[#D4C5B9]">Consulting Engineering & Planning</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Building dreams into reality with excellence in architecture and construction.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("about");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("services");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("projects");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("contact");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Consultation</li>
              <li>Engineering</li>
              <li>Planning</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>House No 8/10, Block A</li>
              <li>Lalmatia, Dhaka-1207</li>
              <li>
                <a
                  href="https://maps.app.goo.gl/kgh9u6cV958WaChBA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-red-500 transition-colors group"
                >
                  <MapPin className="h-4 w-4" />
                  <span className="group-hover:underline">View on Google Maps</span>
                </a>
              </li>
              <li className="mt-3">+880 1711-624061</li>
              <li>agates_00@yahoo.com</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; 2024 ALI ASGAR & ASSOCIATES. All rights reserved.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                href="mailto:agates_00@yahoo.com"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                href="https://www.youtube.com/watch?v=dkM9GxaCow4&list=RDdkM9GxaCow4&start_radio=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                href="https://www.youtube.com/watch?v=dkM9GxaCow4&list=RDdkM9GxaCow4&start_radio=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}