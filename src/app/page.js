"use client";

import dynamic from 'next/dynamic';
import Footer from "@/components/User/Footer";
import LandingPage from "@/components/User/LandingPage";
import Navbar from "@/components/User/Navbar";


const LazyLandingPage = dynamic(() => import("@/components/User/LandingPage"), { 
  ssr: false 
});

export default function Home() {
  return (
    <div className="bg-white">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <LazyLandingPage />  
        </main>
        <Footer />
      </div>
    </div>
  );
}
