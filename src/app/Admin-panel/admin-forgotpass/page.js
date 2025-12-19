'use client';
import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LipiBookForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    if (email.trim()) {
      setIsSubmitted(true);
    }
  };

  const handleBackToLogin = () => {
    router.push('/Admin-panel/admin-resetpass'); // ✅ correct route
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-[#E8D5BA]">
      {/* ===== HEADER ===== */}
      <header className="w-full px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between bg-[#F5E6D3] border-b border-[#d4c4b0] flex-shrink-0">
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

      {/* ===== MAIN ===== */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-10 sm:py-14 w-full">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-10">
          <Image
            src="/images/lipibook.png"
            alt="LipiBook Logo"
            width={120}
            height={100}
            priority
            className="mx-auto w-auto h-auto"
          />
        </div>

        {/* ===== FORM OR SUCCESS ===== */}
        {!isSubmitted ? (
          <div className="w-full sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/4 px-4 sm:px-6 ">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 text-black">
              ADMINISTRATIVE LOGIN SYSTEM
            </h2>
            <h3 className="text-lg sm:text-xl font-bold text-center mb-8 text-black">
              FORGOT PASSWORD
            </h3>

            <div className="mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="COMMITTEE MAIL"
                className="w-full px-4 py-3 text-sm sm:text-base outline-none rounded-md border border-[#D4A574] bg-[#F5E6D3] text-black placeholder-[#6b5d52] focus:ring-1 focus:ring-[#8b4513]"
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="bg-black text-white w-1/2 py-3 text-sm sm:text-base font-semibold hover:bg-gray-800 transition-colors rounded-md"
              >
                RESET PASS
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/3 px-4 sm:px-6 text-center py-8 ">
            <h2 className="text-xl sm:text-2xl font-bold mb-8 text-black">
              COMMITTEE LOGIN SYSTEM
            </h2>

            <p
              className="text-lg sm:text-xl italic mb-8 text-black"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              DEAR COMMITTEE, RESET LINK SENT
              <br />
              SUCCESSFULLY.
            </p>

            <div className="flex justify-center">
              <button
                onClick={handleBackToLogin}
                className="bg-black text-white w-1/2 py-3 text-sm sm:text-base font-semibold hover:bg-gray-800 transition-colors rounded-md"
              >
                BACK TO LOGIN
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#e8d7c3] px-3 py-3 border-t border-[#d4c4b0] flex-shrink-0">
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          <div className="w-6 h-6"></div>
          <p className="text-[#2c1810] text-xs sm:text-sm md:text-base text-center flex-1">
            <b>भारत इतिहास संशोधक मंडळ, पुणे | LipiBook</b>
          </p>
          <button className="text-[#5c3d2e] hover:text-[#8b4513] transition-colors duration-200">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
}
