'use client'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { HelpCircle, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  // Handlers
  const handleCommitteeLogin = () => router.push('/Committee-Panel/commitee-login');
  const handleUserLogin = () => router.push('/UserLogin/LoginPage');
  const handleAdminLogin = () => router.push('/Admin-panel/admin-login');
  const handleHelpClick = () => alert('Help button clicked! (You can link this to Help page)');

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#e8d7c3]">
      {/* ========== HEADER ========== */}
      <header className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8 flex-shrink-0 bg-[#F5E6D3] border-b border-[#d4c4b0] shadow-sm">
        <div className="flex items-start justify-between">
          {/* Left Logo */}
          <div className="flex-shrink-0 mt-2">
            <div className="w-20 h-20 sm:w-24 sm:h-24 relative">
              <Image
                src="/images/rgstc.png"
                alt="RGSTC Logo"
                width={96}
                height={96}
                className="object-contain"
              />
            </div>
          </div>

          {/* Center Text */}
          <div className="flex flex-col items-center justify-center text-center flex-1 px-4">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-black leading-tight">
              Rajiv Gandhi Science & Technology Commission, Mumbai
            </span>
            <span className="text-sm font-medium text-black italic mt-1">
              In Collaboration with
            </span>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-black mt-2">
              Vishwakarma Institute of Technology, Pune
            </span>
            <span className="text-xs sm:text-sm text-black italic mt-1">
              (An Autonomous Institute Affiliated to Savitribai Phule Pune University)
            </span>
          </div>

          {/* Right Logo */}
          <div className="flex-shrink-0 ml-4 mt-2">
            <Image
              src="/images/VIT.png"
              alt="VIT Logo"
              width={96}
              height={96}
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
            />
          </div>
        </div>
      </header>

      {/* ========== NAVBAR ========== */}
      <nav className="w-full bg-[#e8d7c3] border-b border-[#d4c4b0] py-2 px-10 flex justify-between items-center font-semibold text-sm sm:text-base">
        <div className="flex space-x-6">
          <a href="#" className="text-black hover:text-[#5c3d2e] transition">Register/Login</a>
          <a href="#" className="text-black hover:text-[#5c3d2e] transition">Contact Us</a>
          <a href="#" className="text-black hover:text-[#5c3d2e] transition">About</a>
        </div>
        <div className="flex space-x-3 text-[#5c3d2e]">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-5 h-5 hover:text-black transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-5 h-5 hover:text-black transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-5 h-5 hover:text-black transition" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-5 h-5 hover:text-black transition" />
          </a>
        </div>
      </nav>

      {/* ========== MAIN CONTENT ========== */}
      <main
        className="relative flex-1 flex flex-col items-center justify-center text-center bg-cover bg-center px-6 py-10 transition-all duration-500"
        style={{ backgroundImage: 'url("/images/fort.png")' }}
      >
        {/* Dim overlay only lightly, not too dark */}
        <div className="absolute inset-0 bg-black/20 transition-all duration-500"></div>

        {/* Text content - will brighten when hovered */}
        <div className="relative z-10 max-w-4xl group transition-all duration-500">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#fff6e9] mb-6 drop-shadow-lg group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300">
            Welcome! Our platform is dedicated to making historical documents accessible.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#f8ede3] font-medium leading-relaxed mb-10 drop-shadow-md group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300">
            Easily convert your documents from the Modi script (<b>मोडी लिपी</b>) to the modern Devanagari script (<b>देवनागरी लिपी</b>).
            Preserve your heritage and unlock the knowledge within your manuscripts with our fast and accurate online tool.
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#fff6e9] mb-6 drop-shadow-lg group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300">
            Register / Login
          </h2>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={handleUserLogin}
              className="bg-[#2c1810] text-white px-8 py-3 rounded-md text-base sm:text-lg font-medium hover:bg-[#3e2315] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign In (User)
            </button>

            <button
              onClick={handleCommitteeLogin}
              className="bg-[#2c1810] text-white px-8 py-3 rounded-md text-base sm:text-lg font-medium hover:bg-[#3e2315] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign In (Committee)
            </button>

            <button
              onClick={handleAdminLogin}
              className="bg-[#2c1810] text-white px-8 py-3 rounded-md text-base sm:text-lg font-medium hover:bg-[#3e2315] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign In (Admin)
            </button>
          </div>
        </div>
      </main>


{/* ------------------- START FOOTER (Standard Clean Structure) ------------------- */}
{/* ------------------- START FOOTER (Text Size Adjusted) ------------------- */}
      <footer className="bg-[#e8d7c3] px-3 py-3 border-t border-[#d4c4b0] flex-shrink-0">
              <div className="max-w-8xl mx-auto flex items-center justify-between">
                <div className="w-6 h-6"></div>
                <p className="text-[#2c1810] text-xs sm:text-sm md:text-base text-center flex-1">
                 <b> भारत इतिहास संशोधक मंडळ, पुणे | LipiBook</b>
                </p>
                <button className="text-[#5c3d2e] hover:text-[#8b4513] transition-colors duration-200">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </footer>
      {/* ------------------- END FOOTER ------------------- */}
    </div>
  );
}
