import { useState } from "react";
import { MapPin, Phone, Mail, Clock, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { motion } from "motion/react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: User,
      title: "CEO",
      content: "Md. Ali Asgar",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "House No 8/10, (2nd Floor), Block A, Lalmatia, Dhaka-1207",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+880 1711-624061",
    },
    {
      icon: Mail,
      title: "Email",
      content: "agates_00@yahoo.com",
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Saturday - Thursday: 9:00 AM - 6:00 PM",
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-20 bg-[#0a0908]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-white">
            Get In Touch
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Ready to start your construction project? Contact us today for a free consultation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border-gray-700 text-white"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border-gray-700 text-white"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border-gray-700 text-white"
                  autoComplete="tel"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Textarea
                  name="message"
                  placeholder="Tell us about your project"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-gray-800 border-gray-700 text-white"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  size="lg"
                >
                  Send Message
                </Button>
              </motion.div>
            </form>
          </motion.div>

          <div className="space-y-4 md:space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-gray-700 bg-gray-800 hover:shadow-lg hover:shadow-red-500/10 transition-shadow">
                  <CardContent className="p-4 md:p-6 flex gap-4">
                    <div className="w-12 h-12 bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-[#D4C5B9]" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-sm md:text-base text-white">{info.title}</h3>
                      <p className="text-gray-400 text-sm md:text-base break-words">{info.content}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}