"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/navbar";
import { ThemeProvider } from "../components/theme-provider";
import HeroSection from "./HeroSection/page";
import AboutSection from "./AboutSection/page";
import CallToAction from "./CallToAction/page";
import Dashboard from "./Dashboard/page";
import TeamsPage from "./TeamsPage/page";
import BlogSection from "./BlogSection/page";
import Footer from "@/components/Footer/footer";
import { ModeToggle } from "@/components/mode-toggle";
import PartnerSection from "./PartnerSection/page";
import GallerySection from "./GallerySection/page";
import MissionVisionSection from "./MissionVisionSection/page";
import PageLoader from "./PageLoader";
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <PageLoader isLoading={isLoading} />

      <div
        className={`min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 transition-all duration-500 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="fixed top-24 right-6 z-[9999] md:top-28 md:right-8">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-105 p-1 backdrop-blur-sm">
              <ModeToggle />
            </div>
          </div>
        </div>
        <Navbar />

        <main>
          <HeroSection />
          <AboutSection />
          <MissionVisionSection />
          <CallToAction />
          <Dashboard />
          <TeamsPage />
          <PartnerSection />
          <BlogSection />
          <GallerySection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
