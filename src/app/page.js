import Footer from "@/components/User/Footer";
import LandingPage from "@/components/User/LandingPage";
import Navbar from "@/components/User/Navbar";

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
