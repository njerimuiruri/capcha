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
// import { ModeToggle } from "@/components/mode-toggle";
import PartnerSection from "./PartnerSection/page";
import GallerySection from "./GallerySection/page";
import MissionVisionSection from "./MissionVisionSection/page";
import VideoSection from "./VideoSection/page";
import PageLoader from "./PageLoader";
import OpenCallsWidget from "./OpenCallsWidget";
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
        <Navbar />
        <OpenCallsWidget />

        <main>
          <HeroSection />
          <AboutSection />
          <MissionVisionSection />
          <CallToAction />
          <Dashboard />
          {/* <TeamsPage /> */}
          <PartnerSection />
          <BlogSection />
          <VideoSection />
          <GallerySection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
