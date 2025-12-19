'use client';

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleHome = () => {
    console.log('Routing to /Admin-panel/admin-home...');
    router.push('/Admin-panel/admin-home'); // ✅ Correct route
  };

  const handleForgetPassword = () => {
    router.push('/Admin-panel/admin-forgotpass'); // ✅ Correct route
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e8d7c3]">
      {/* ===== HEADER ===== */}
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

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 w-full overflow-hidden">
        {/* Logo */}
        <div className="text-center mb-4 sm:mb-6">
          <Image
            src="/images/lipibook.png"
            alt="LipiBook Logo"
            width={120}
            height={100}
            className="mx-auto w-auto h-auto"
          />
        </div>

        {/* Login Box */}
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/4 px-4 sm:px-6 bg-[#e8d7c3]">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 text-black">
            ADMINISTRATIVE LOGIN SYSTEM
          </h2>
          <div className="space-y-3 sm:space-y-4 flex flex-col items-center">
            <input
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-md outline-none border border-[#b8a898] bg-white placeholder-[#6b5d52] focus:border-[#8b4513] focus:ring-1 focus:ring-[#8b4513]"
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-md outline-none border border-[#b8a898] bg-white placeholder-[#6b5d52] focus:border-[#8b4513] focus:ring-1 focus:ring-[#8b4513]"
            />

            {/* Centered Sign In Button (half width) */}
            <button
              onClick={handleHome}
              className="w-1/2 bg-black text-white py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-md hover:bg-gray-800 transition-colors mx-auto block"
            >
              SIGN IN
            </button>

            <button
              onClick={handleForgetPassword}
              className="text-[#2c1810] text-sm sm:text-base hover:text-[#8b4513] hover:underline transition-colors mt-1"
            >
              FORGOT PASSWORD?
            </button>
          </div>
        </div>
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
