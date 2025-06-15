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

export const metadata = {
  title: "Consultative Platform On Climate and Health",
  description:
    "Building a trasdisciplinary community of practice towards enhanced decisio support environment on C & H research and policy in Africa",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Home() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
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
