/**
 * ALI ASGAR & ASSOCIATES - Main Application Component
 * 
 * This is the root component that sets up routing for the entire application.
 * It uses React Router to handle navigation between different pages.
 * 
 * Routes:
 * - / : Home page with all sections
 * - /project/:id : Individual project detail page
 * - /category/:categoryId : Category listing page with projects
 * 
 * @module App
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { CategoryPage } from "./pages/CategoryPage";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}