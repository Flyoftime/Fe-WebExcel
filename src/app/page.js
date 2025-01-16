import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (

    <div className="bg-[#0d0f2b]">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <LandingPage />
        </main>
        <Footer />
      </div>
    </div>
  );
}
