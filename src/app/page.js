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
import InitiativesSection from "./InitiativesSection/page";
import PageLoader from "./PageLoader";
import OpenCallsWidget from "./OpenCallsWidget";
import FeaturedDocument from "@/components/FeaturedDocument";
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
          <section
            id="featured-brief"
            className="scroll-mt-32 bg-white dark:bg-gray-900 pt-16 pb-2"
          >
            <div className="container mx-auto px-6 lg:px-12">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-[#0e8601]" />
                <span className="text-[#0e8601] font-semibold text-xs tracking-widest uppercase">
                  Featured Policy Brief
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#021d49] dark:text-white mb-8">
                Lancet Countdown: Kenya 2026
              </h2>
              <FeaturedDocument />
            </div>
          </section>
          <InitiativesSection />
          <AboutSection />
          <MissionVisionSection />
          <CallToAction />
          <Dashboard />
          {/* <TeamsPage /> */}
          <PartnerSection />
          <BlogSection />
          <GallerySection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
