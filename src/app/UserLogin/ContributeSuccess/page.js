'use client';
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, HelpCircle, Check } from "lucide-react";

export default function ContributeSuccess() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    router.push("/UserLogin/LoginPage");
  };

  const handleGoToMain = () => {
    router.push("/UserLogin/UploadPage");
  };

  const handleHelpClick = () => {
    console.log("Help clicked!");
  };

  return (
    <div className="h-screen w-full bg-[#e8d7c3] flex flex-col overflow-hidden relative">
      {/* ---------------- HEADER ---------------- */}
      <header className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between bg-[#F5E6D3] border-b border-[#d4c4b0] flex-shrink-0">
              <div className="flex items-center gap-2 sm:gap-4">
                <Image
                  src="/images/rgstc.png"
                  alt="RGSTC Logo"
                  width={50}
                  height={50}
                  className="w-12 h-12 sm:w-14 sm:h-14"
                />
              </div>
              <h1 className="flex-1 text-center text-black text-lg sm:text-xl lg:text-2xl font-bold px-2 sm:px-4">
                RGSTC MUMBAI IN COLLABORATION WITH VIT, PUNE
              </h1>
              <Image
                src="/images/VIT.png"
                alt="VIT Logo"
                width={50}
                height={50}
                className="w-12 h-12 sm:w-14 sm:h-14"
              />
      </header>

      {/* ---------------- MENU (Hamburger + Dropdown) ---------------- */}
      <div className="relative ml-4 mt-3 flex-shrink-0">
        {/* Hamburger icon */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-[#d4c4b0] rounded transition-colors"
        >
          <Menu className="w-6 h-6 text-black" />
        </button>

        {/* Dropdown menu (like screenshot) */}
        {isMenuOpen && (
          <div className="absolute top-10 left-0 bg-black text-white rounded-lg shadow-lg overflow-hidden z-50 w-44">
            <button
              onClick={handleGoToMain}
              className="block w-full text-left px-4 py-2 font-bold hover:bg-gray-800 transition-colors"
            >
              UPLOAD PAGE
            </button>
            <div className="border-t border-gray-700"></div>
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 font-bold hover:bg-gray-800 transition-colors"
            >
              SIGN OUT
            </button>
          </div>
        )}
      </div>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center mt-[-30px]">
        <img
          src="/images/ContributeLogo.png"
          alt="Contribute Logo"
          className="w-16 h-16 sm:w-30 sm:h-30 mx-auto mb-1 object-contain"
        />

        <h2 className="text-2xl font-bold text-[#2c1810] mb-5">Contribution Successful !!!</h2>

        <div className="bg-[#f2e7d7] p-10 rounded-xl shadow-lg w-full max-w-sm border border-[#d4c4b0] mt-4">
          <div className="flex justify-center mb-4">
            <Check className="w-12 h-12 text-black" strokeWidth={3} />
          </div>
          <p className="font-bold text-black text-lg leading-snug">
            Thanks for your contribution
            <br />
            We will review your document soon!
          </p>
        </div>
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-[#e8d7c3] px-3 py-3 border-t border-[#d4c4b0] flex-shrink-0">
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          <div className="w-6 h-6" />
          <p className="text-[#2c1810] text-xs sm:text-sm md:text-base text-center flex-1">
            <b>भारत इतिहास संशोधक मंडळ, पुणे | LipiBook</b>
          </p>
          <button
            onClick={handleHelpClick}
            className="text-[#5c3d2e] hover:text-[#8b4513] transition-colors duration-200"
          >
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
}
