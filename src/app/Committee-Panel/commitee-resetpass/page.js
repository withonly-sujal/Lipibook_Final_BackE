"use client";

import React, { useState } from "react";
import { HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LipiBookResetPass() {
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleGetOtp = () => {
    alert("OTP sent to registered admin email 📩");
  };

  const handleReset = () => {
    if (!password || !otp) {
      alert("Please fill in both fields before resetting.");
      return;
    }
    alert("Admin password reset successful ✅");
    router.push("/Admin-panel/admin-login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e8d7c3]">
      {/* ===== HEADER ===== */}
      <header className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between bg-[#F5E6D3] border-b border-[#d4c4b0]">
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
        {/* LipiBook Logo */}
        <div className="text-center mb-4 sm:mb-6">
          <Image
            src="/images/lipibook.png"
            alt="LipiBook Logo"
            width={120}
            height={100}
            className="mx-auto w-auto h-auto"
          />
        </div>

        {/* Forgot Password Box */}
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/4 px-4 sm:px-6 bg-[#e8d7c3]">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-3 text-black">
            FORGOT PASSWORD
          </h2>

          {/* NEW PASSWORD */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="NEW PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-md outline-none border border-[#b8a898] bg-[#e8d7c3] placeholder-[#000] text-black focus:border-[#8b4513] focus:ring-1 focus:ring-[#8b4513]"
            />
          </div>

          {/* OTP Input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-md outline-none border border-[#b8a898] bg-[#e8d7c3] placeholder-[#000] text-black focus:border-[#8b4513] focus:ring-1 focus:ring-[#8b4513]"
            />
          </div>

          {/* Buttons in one row */}
          <div className="w-full flex items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={handleGetOtp}
              className="bg-gray-500 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base border border-[#b8a898] rounded-md hover:bg-gray-800 transition-colors"
            >
              GET OTP
            </button>

            <button
              onClick={handleReset}
              className="bg-black text-white px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base font-semibold rounded-md hover:bg-gray-800 transition-colors"
            >
              RESET ADMIN
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
