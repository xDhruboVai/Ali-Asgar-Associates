/**
 * ALI ASGAR & ASSOCIATES - Project Data Repository
 * 
 * This file serves as the central data source for all projects and categories
 * displayed throughout the website. It contains structured data for portfolio
 * projects across various categories.
 * 

 */

export interface Project {
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

export const projectsData: Project[] = [
  // Luxury Residential Complex Projects
  {
    id: "Megaknight-Duplex-Shopping-Complex",
    title: "Megaknight-Duplex-Shopping-Complex",
    location: "Gulshan, Dhaka",
    type: "Residential",
    category: "luxury-residential-complex",
    image: "https://images.unsplash.com/photo-1672508013582-035e75fb76ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzY0NjY4MDkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "15-story residential building with modern amenities",
    fullDescription: "A prestigious 15-story residential complex featuring state-of-the-art amenities and contemporary architectural design. This luxury development offers spacious apartments with premium finishes, rooftop facilities, and sustainable building features.",
    year: "2022",
    client: "Gulshan Properties Ltd.",
    area: "45,000 sq ft",
    duration: "24 months",
    gallery: [
      "https://images.unsplash.com/photo-1672508013582-035e75fb76ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzY0NjY4MDkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQ2OTE1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwZ2FyZGVufGVufDF8fHx8MTc2NDY5MTYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "24/7 security and CCTV surveillance",
      "Rooftop garden and recreational area",
      "Modern gym and swimming pool",
      "Underground parking facility",
      "Backup power generator",
      "Earthquake-resistant structure",
      "Energy-efficient LED lighting",
      "High-speed elevators",
    ],
    challenges: "The project required careful planning to maximize space utilization while maintaining aesthetic appeal in a densely populated area of Gulshan.",
    solution: "We implemented innovative architectural solutions with vertical expansion, optimized floor plans, and incorporated sustainable building practices to create a premium living space.",
  },
  {
    id: "luxury-residential-complex-banani",
    title: "Premium Apartment Tower",
    location: "Banani, Dhaka",
    type: "Residential",
    category: "luxury-residential-complex",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGFwYXJ0bWVudCUyMHRvd2VyfGVufDF8fHx8MTc2NDY5MTU2OXww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Exclusive 20-story tower with panoramic city views",
    fullDescription: "An exclusive residential tower featuring luxury apartments with floor-to-ceiling windows, modern smart home technology, and world-class amenities. Each unit is designed to provide maximum comfort and elegance.",
    year: "2023",
    client: "Banani Elite Residences",
    area: "52,000 sq ft",
    duration: "28 months",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGFwYXJ0bWVudCUyMHRvd2VyfGVufDF8fHx8MTc2NDY5MTU2OXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnR8ZW58MXx8fHwxNzY0NjkxNTY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQ2OTE1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "Smart home automation",
      "Infinity swimming pool",
      "Private balconies with city views",
      "Concierge services",
      "Fitness center and spa",
      "Children's play area",
      "Multi-level parking",
      "Power backup system",
    ],
    challenges: "Integrating smart home technology throughout the building while ensuring structural integrity and maintaining construction timeline.",
    solution: "We partnered with leading technology providers and implemented a phased installation approach, allowing for thorough testing while meeting deadlines.",
  },
  {
    id: "luxury-residential-complex-dhanmondi",
    title: "Elite Residences",
    location: "Dhanmondi, Dhaka",
    type: "Residential",
    category: "luxury-residential-complex",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGNvbXBsZXh8ZW58MXx8fHwxNzY0NjkxNTY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Heritage-inspired luxury residences with modern facilities",
    fullDescription: "A unique blend of traditional Bengali architectural elements with contemporary luxury living. This development preserves the cultural heritage of Dhanmondi while providing all modern comforts.",
    year: "2021",
    client: "Dhanmondi Heritage Developers",
    area: "38,000 sq ft",
    duration: "22 months",
    gallery: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGNvbXBsZXh8ZW58MXx8fHwxNzY0NjkxNTY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZXxlbnwxfHx8fDE3NjQ2OTE1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGludGVyaW9yfGVufDF8fHx8MTc2NDY5MTU2OXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "Heritage-inspired architecture",
      "Spacious apartments with high ceilings",
      "Central courtyard and gardens",
      "Premium interior finishes",
      "Community hall",
      "Secure parking",
      "Solar power integration",
      "Rainwater harvesting",
    ],
    challenges: "Balancing traditional architectural aesthetics with modern building codes and functionality requirements.",
    solution: "Our team collaborated with heritage architects to create a design that honors tradition while incorporating modern engineering and safety standards.",
  },

  // Commercial Office Tower Projects
  {
    id: "commercial-office-tower-banani",
    title: "Commercial Office Tower",
    location: "Banani, Dhaka",
    type: "Commercial",
    category: "commercial-office-tower",
    image: "https://images.unsplash.com/photo-1632398793634-e3cd63fc9e84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBtb2Rlcm58ZW58MXx8fHwxNzY0NjgxNjAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "State-of-the-art office building with sustainable features",
    fullDescription: "A modern 12-story commercial office tower designed with sustainability at its core. Features include energy-efficient systems, smart building technology, and flexible workspace layouts that meet international standards.",
    year: "2021",
    client: "Banani Commercial Ventures",
    area: "65,000 sq ft",
    duration: "28 months",
    gallery: [
      "https://images.unsplash.com/photo-1632398793634-e3cd63fc9e84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBtb2Rlcm58ZW58MXx8fHwxNzY0NjgxNjAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQ2OTE2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxvZmZpY2UlMjBidWlsZGluZyUyMGdsYXNzfGVufDF8fHx8MTc2NDY5MTY3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "LEED certified green building",
      "Solar panels for renewable energy",
      "Rainwater harvesting system",
      "Smart HVAC system",
      "High-speed fiber optic connectivity",
      "Ample parking with EV charging stations",
      "Modern conference facilities",
      "Fire safety and emergency systems",
    ],
    challenges: "Creating an energy-efficient commercial space while meeting tight budget constraints and adhering to green building standards.",
    solution: "We integrated sustainable technologies from the design phase, sourced local eco-friendly materials, and implemented smart building management systems to reduce operational costs.",
  },
  {
    id: "commercial-office-tower-gulshan",
    title: "Corporate Plaza",
    location: "Gulshan, Dhaka",
    type: "Commercial",
    category: "commercial-office-tower",
    image: "https://images.unsplash.com/photo-1564708779087-4846b681af2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjQ2OTE2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Premium corporate headquarters with glass facade",
    fullDescription: "An iconic 18-story corporate plaza featuring a stunning glass facade and cutting-edge office spaces. Designed to accommodate multinational corporations with world-class facilities and amenities.",
    year: "2023",
    client: "Gulshan Corporate Holdings",
    area: "85,000 sq ft",
    duration: "32 months",
    gallery: [
      "https://images.unsplash.com/photo-1564708779087-4846b681af2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjQ2OTE2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBzcGFjZXxlbnwxfHx8fDE3NjQ2OTE2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwcm9vbXxlbnwxfHx8fDE3NjQ2OTE2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "Double-glazed glass facade",
      "Executive office suites",
      "State-of-the-art conference centers",
      "Business lounge and cafeteria",
      "Dedicated server rooms",
      "Multi-level secure parking",
      "Helipad on rooftop",
      "24/7 building management",
    ],
    challenges: "Installing a complex glass facade system while maintaining structural integrity and energy efficiency in Dhaka's tropical climate.",
    solution: "We used advanced double-glazed, UV-resistant glass with thermal insulation properties and implemented a sophisticated HVAC system for optimal climate control.",
  },
  {
    id: "commercial-office-tower-motijheel",
    title: "Business Hub",
    location: "Motijheel, Dhaka",
    type: "Commercial",
    category: "commercial-office-tower",
    image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG9mZmljZSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2NDY5MTY1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Mixed-use commercial building in financial district",
    fullDescription: "A strategic commercial development in Dhaka's financial hub, combining office spaces, retail units, and banking facilities. Designed to serve as a central business destination.",
    year: "2022",
    client: "Motijheel Business Group",
    area: "72,000 sq ft",
    duration: "26 months",
    gallery: [
      "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG9mZmljZSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2NDY5MTY1MXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBsb2JieXxlbnwxfHx8fDE3NjQ2OTE2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwc3BhY2V8ZW58MXx8fHwxNzY0NjkxNjUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "Mixed-use commercial spaces",
      "Banking facilities",
      "Retail showrooms",
      "Flexible office layouts",
      "Central air conditioning",
      "Advanced security systems",
      "Ample parking space",
      "Generator backup",
    ],
    challenges: "Integrating diverse commercial functions within a single structure while ensuring efficient traffic flow and security.",
    solution: "We designed separate access points for different zones, implemented zoned security systems, and created versatile floor plans adaptable to various business needs.",
  },

  // Infrastructure Development Projects
  {
    id: "infrastructure-development-chittagong",
    title: "Infrastructure Development",
    location: "Chittagong",
    type: "Infrastructure",
    category: "infrastructure-development",
    image: "https://images.unsplash.com/photo-1638207849658-e57be0cdc208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXZpbCUyMGVuZ2luZWVyaW5nJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc2NDY4NzIyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Large-scale civil engineering project",
    fullDescription: "A comprehensive infrastructure development project including road networks, drainage systems, and utility installations. This project significantly improved the urban infrastructure of the Chittagong commercial district.",
    year: "2020",
    client: "Chittagong Development Authority",
    area: "2.5 km stretch",
    duration: "18 months",
    gallery: [
      "https://images.unsplash.com/photo-1638207849658-e57be0cdc208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXZpbCUyMGVuZ2luZWVyaW5nJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc2NDY4NzIyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc2NDY5MTcyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "Modern road network design",
      "Advanced drainage systems",
      "Underground utility corridors",
      "Street lighting infrastructure",
      "Traffic management systems",
      "Pedestrian walkways and crossings",
      "Landscaping and green spaces",
      "Flood prevention measures",
    ],
    challenges: "Coordinating multiple utility installations while maintaining traffic flow and minimizing disruption to local businesses and residents.",
    solution: "Implemented a phased construction approach with night shifts for critical work, established clear communication channels with stakeholders, and used advanced project management tools.",
  },
  {
    id: "infrastructure-development-sylhet",
    title: "Urban Road Network",
    location: "Sylhet",
    type: "Infrastructure",
    category: "infrastructure-development",
    image: "https://images.unsplash.com/photo-1590319026070-be9e925fd755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwY29uc3RydWN0aW9uJTIwcHJvamVjdHxlbnwxfHx8fDE3NjQ2OTE3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Comprehensive road expansion and improvement project",
    fullDescription: "A major urban road network expansion project that improved connectivity between key areas of Sylhet city. Includes new road construction, bridge building, and traffic management infrastructure.",
    year: "2022",
    client: "Sylhet City Corporation",
    area: "4 km network",
    duration: "20 months",
    gallery: [
      "https://images.unsplash.com/photo-1590319026070-be9e925fd755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwY29uc3RydWN0aW9uJTIwcHJvamVjdHxlbnwxfHx8fDE3NjQ2OTE3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1600053336497-d2a5b7e0c0b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZ2UlMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzY0NjkxNzI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1593642532400-2682810df593?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHJvYWR8ZW58MXx8fHwxNzY0NjkxNzI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "Wide multi-lane roads",
      "Modern bridge structures",
      "Smart traffic signals",
      "LED street lighting",
      "Dedicated cycling lanes",
      "Bus rapid transit infrastructure",
      "Pedestrian overpasses",
      "Stormwater management",
    ],
    challenges: "Managing construction across multiple sites simultaneously while dealing with monsoon season challenges and maintaining existing traffic flow.",
    solution: "Developed a comprehensive phased construction plan with weather contingencies, implemented temporary traffic diversions, and coordinated closely with local authorities.",
  },
  {
    id: "infrastructure-development-rajshahi",
    title: "Water Supply System",
    location: "Rajshahi",
    type: "Infrastructure",
    category: "infrastructure-development",
    image: "https://images.unsplash.com/photo-1625248772052-1e649c2a1d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHN1cHBseSUyMHN5c3RlbXxlbnwxfHx8fDE3NjQ2OTE3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Modern water distribution infrastructure",
    fullDescription: "A comprehensive water supply and distribution system serving multiple neighborhoods in Rajshahi. Includes water treatment facilities, storage tanks, and distribution pipelines ensuring clean water access.",
    year: "2021",
    client: "Rajshahi WASA",
    area: "15 km pipeline network",
    duration: "16 months",
    gallery: [
      "https://images.unsplash.com/photo-1625248772052-1e649c2a1d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHN1cHBseSUyMHN5c3RlbXxlbnwxfHx8fDE3NjQ2OTE3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1582719366924-d7730a68ee7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRyZWF0bWVudCUyMHBsYW50fGVufDF8fHx8MTc2NDY5MTcyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZyYXN0cnVjdHVyZSUyMHBpcGVsaW5lfGVufDF8fHx8MTc2NDY5MTcyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "Advanced filtration system",
      "Underground pipeline network",
      "Water storage reservoirs",
      "Pumping stations",
      "Quality monitoring systems",
      "Leak detection technology",
      "Pressure management zones",
      "Smart metering infrastructure",
    ],
    challenges: "Installing underground pipelines in densely populated areas without disrupting existing utilities and water supply.",
    solution: "Used trenchless technology where possible, worked in phases to maintain partial service, and implemented 24/7 emergency response teams.",
  },

  // Architectural Marvel Projects
  {
    id: "architectural-marvel-dhanmondi",
    title: "Architectural Marvel",
    location: "Dhanmondi, Dhaka",
    type: "Mixed-Use",
    category: "architectural-marvel",
    image: "https://images.unsplash.com/photo-1721244653757-b76cc4679dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMGRlc2lnbiUyMGJsdWVwcmludHxlbnwxfHx8fDE3NjQ2ODk3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Award-winning architectural design and execution",
    fullDescription: "An iconic mixed-use development that combines residential, commercial, and recreational spaces in a harmonious architectural design. This project has won multiple awards for its innovative approach to urban development.",
    year: "2023",
    client: "Dhanmondi Urban Development",
    area: "85,000 sq ft",
    duration: "30 months",
    gallery: [
      "https://images.unsplash.com/photo-1721244653757-b76cc4679dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMGRlc2lnbiUyMGJsdWVwcmludHxlbnwxfHx8fDE3NjQ2ODk3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXhlZCUyMHVzZSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2NDY5MTc4OXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1464146072230-91cabc968266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY0NjkxODA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "Multi-functional spaces",
      "Innovative facade design",
      "Natural ventilation systems",
      "Community gathering spaces",
      "Retail shops and dining areas",
      "Premium residential units",
      "Co-working spaces",
      "Smart building technology",
    ],
    challenges: "Balancing diverse functional requirements within a single structure while creating a cohesive architectural identity.",
    solution: "Developed a modular design approach that allowed for functional flexibility, incorporated vertical zoning, and used unified architectural language throughout the building.",
  },
  {
    id: "architectural-marvel-uttara",
    title: "Iconic Tower",
    location: "Uttara, Dhaka",
    type: "Mixed-Use",
    category: "architectural-marvel",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBza3lzY3JhcGVyfGVufDF8fHx8MTc2NDY5MTgwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Landmark skyscraper with distinctive design",
    fullDescription: "A striking architectural landmark that redefines Uttara's skyline. This multi-use tower features a distinctive twisted design that maximizes natural light and views while creating an iconic silhouette.",
    year: "2023",
    client: "Uttara Landmark Developers",
    area: "95,000 sq ft",
    duration: "34 months",
    gallery: [
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBza3lzY3JhcGVyfGVufDF8fHx8MTc2NDY5MTgwOHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY29uaWMlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjQ2OTE4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza3lzY3JhcGVyJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0NjkxODA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "Twisted architectural design",
      "Panoramic city views",
      "Sky gardens on multiple levels",
      "Luxury penthouses",
      "Shopping mall",
      "Five-star hotel",
      "Observation deck",
      "Advanced wind engineering",
    ],
    challenges: "Engineering a complex twisted structure that meets safety standards while achieving the desired aesthetic impact.",
    solution: "Collaborated with international structural engineers, used advanced computational modeling for wind and seismic analysis, and implemented progressive construction techniques.",
  },
  {
    id: "architectural-marvel-gulshan",
    title: "Cultural Center",
    location: "Gulshan, Dhaka",
    type: "Cultural",
    category: "architectural-marvel",
    image: "https://images.unsplash.com/photo-1569437061238-3cf61084f487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGNlbnRlcnxlbnwxfHx8fDE3NjQ2OTE4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Contemporary cultural hub with traditional influences",
    fullDescription: "A stunning cultural center that celebrates Bengali heritage through contemporary architecture. Features include galleries, performance spaces, and educational facilities, all wrapped in an architecturally significant structure.",
    year: "2022",
    client: "Bangladesh Cultural Foundation",
    area: "42,000 sq ft",
    duration: "24 months",
    gallery: [
      "https://images.unsplash.com/photo-1569437061238-3cf61084f487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGNlbnRlcnxlbnwxfHx8fDE3NjQ2OTE4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWRpdG9yaXVtJTIwZGVzaWdufGVufDF8fHx8MTc2NDY5MTgwOHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc2NDY5MTgwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      "Multi-purpose auditorium",
      "Art galleries and exhibition halls",
      "Traditional courtyard design",
      "Performance stages",
      "Library and archive",
      "Cafe and restaurant",
      "Outdoor amphitheater",
      "Natural lighting integration",
    ],
    challenges: "Creating acoustically superior performance spaces while incorporating traditional architectural elements and modern functionality.",
    solution: "Worked with acoustic engineers and cultural experts to design spaces that honor tradition while providing state-of-the-art performance capabilities.",
  },
];

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  return projectsData.filter(project => project.category === category);
};

/**
 * Category Definitions
 */

export const categories = [
  {
    id: "luxury-residential-complex",
    title: "Luxury Residential Complex",
    description: "Premium residential developments with modern amenities",
  },
  {
    id: "commercial-office-tower",
    title: "Commercial Office Tower",
    description: "State-of-the-art office buildings with sustainable features",
  },
  {
    id: "infrastructure-development",
    title: "Infrastructure Development",
    description: "Large-scale civil engineering and infrastructure projects",
  },
  {
    id: "architectural-marvel",
    title: "Architectural Marvel",
    description: "Award-winning designs and innovative structures",
  },
];