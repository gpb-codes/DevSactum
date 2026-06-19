"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Product from "@/components/Product";
import TechStack from "@/components/TechStack";
import Benefits from "@/components/Benefits";
import Comparison from "@/components/Comparison";
import DataSection from "@/components/Data";
import Social from "@/components/Social";
import Contact from "@/components/Contact";
import Countdown from "@/components/Countdown";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import JarvisBackground from "@/components/JarvisBackground";

export default function Home() {
  return (
    <>
      <JarvisBackground />
      <Navbar />
      <Hero />
      <About />
      <Product />
      <TechStack />
      <Benefits />
      <Comparison />
      <DataSection />
      <Countdown />
      <Social />
      <Contact />
      <Footer />
      <Chatbot />
    </>
  );
}
