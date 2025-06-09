// pages/index.js
import Head from 'next/head';
import Navbar from '../../components/Navbar/navbar';
import { ThemeProvider } from "../../components/theme-provider";
import HeroSection from '../HeroSection/page';
import AboutSection from '../AboutSection/page';
import CallToAction from '../CallToAction/page';
import Dashboard from '../Dashboard/page';
import TeamsPage from '../TeamsPage/page';
import NewsSection from '../NewsSection/page';

export default function Home() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
                <Head>
                    <title>ARIN Climate Research | Environmental Sustainability Blog</title>
                    <meta name="description" content="Showcasing data-driven insights on climate change and sustainability" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Navbar />
                <main>
                    <HeroSection />
                    <AboutSection />
                    <CallToAction />
                    <Dashboard />
                    <TeamsPage />
                    <NewsSection />
                </main>
            </div>
        </ThemeProvider>
    );
}