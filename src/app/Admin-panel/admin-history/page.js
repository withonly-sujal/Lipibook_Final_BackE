"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HelpCircle, Menu } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AdminHistory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const folderName = searchParams.get("name") || "1679";
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => router.push("/Admin-panel/admin-login");

  return (
    <div className="min-h-screen flex flex-col bg-[#e8d7c3] relative">
      {/* ===== HEADER ===== */}
      <header className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between bg-[#F5E6D3] border-b border-[#d4c4b0]">
        <div className="flex items-center gap-3">
          <Image
            src="/images/rgstc.png"
            alt="RGSTC Logo"
            width={50}
            height={50}
            className="w-12 h-12 sm:w-14 sm:h-14"
          />
        </div>

        <h1 className="flex-1 text-center text-black text-lg sm:text-xl lg:text-2xl font-bold">
          RGSTC MUMBAI IN COLLABORATION WITH VIT, PUNE
        </h1>

        <p className="hidden sm:block text-sm font-semibold text-gray-700">
          ADMIN ID
        </p>
      </header>

      {/* ===== SIDEBAR MENU ===== */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute top-4 left-4 z-20"
        >
          <Menu className="w-7 h-7 text-black" />
        </button>

        {menuOpen && (
          <div className="absolute top-12 left-4 bg-black text-white w-56 rounded-md shadow-lg z-30">
            <button
              onClick={() => router.push("/Admin-panel/admin-history")}
              className="w-full text-left px-4 py-3 hover:bg-gray-800"
            >
              HISTORY & ACCESS
            </button>
            <button
              onClick={() => router.push("/Admin-panel/admin-manage1")}
              className="w-full text-left px-4 py-3 hover:bg-gray-800"
            >
              MANAGE (STORAGE)
            </button>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-3 hover:bg-gray-800 border-t border-gray-700"
            >
              SIGN OUT
            </button>
          </div>
        )}
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 flex flex-col items-center text-center px-6 mt-8">
        <h2 className="text-2xl font-semibold text-black mb-6">
          {folderName} MODIDOC V1
        </h2>

        <div className="space-y-4 w-full max-w-3xl">
          {[
            { date: "23 JULY 2023", region: "MAHARASHTRA" },
            { date: "19 JUNE 2023", region: "MAHARASHTRA" },
            { date: "23 AUG 2023", region: "GUJARAT" },
            { date: "23 SEP 2023", region: "HARYANA" },
          ].map((entry, index) => (
            <div
              key={index}
              className="bg-white border border-gray-400 rounded-md px-6 py-3 flex justify-between items-center text-[15px] font-semibold text-black shadow-sm"
            >
              <span>ACCESS DATE: {entry.date}</span>
              <span>MOST REGION: {entry.region}</span>
            </div>
          ))}
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#e8d7c3] px-3 py-3 border-t border-[#d4c4b0] flex-shrink-0">
              <div className="max-w-8xl mx-auto flex items-center justify-between">
                <div className="w-6 h-6"></div> 
                <p className="text-[#2c1810] text-xs sm:text-sm md:text-base text-center flex-1">
                  <b>भारत इतिहास संशोधक मंडळ, पुणे | LipiBook</b>
                </p>
                <button
      
                  className="text-[#5c3d2e] hover:text-[#8b4513] transition-colors duration-200"
                >
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
        </footer>
    </div>
  );
}

