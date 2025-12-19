"use client";

import React, { useState } from "react";
import { Menu, FileText, HelpCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function UserFolder() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Static files (upload disabled)
  const [files] = useState([
    { name: "1679 MODIDOC V1" },
    { name: "1679 MODIDOC V2" },
  ]);

  const handleSignOut = () => router.push("/UserLogin/LoginPage");

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
        <div className="flex items-center gap-3">
          <p className="hidden sm:block text-sm font-semibold text-gray-700">
            ADMIN ID
          </p>
        </div>
      </header>

      {/* ===== MAIN SECTION ===== */}
      <main className="flex flex-col items-center flex-1 px-4 text-center mt-4">
        {/* Top Row: Sidebar */}
        <div className="w-full flex justify-between items-center px-6 mb-4">
          {/* Sidebar Menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center p-2 text-black rounded-md transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            {menuOpen && (
              <div className="absolute top-12 left-0 bg-black text-white w-56 rounded-md shadow-lg z-30">
                <button
                  onClick={() => router.push("/Admin-panel/admin-home")}
                  className="w-full text-left px-4 py-3 hover:bg-gray-800"
                >
                  UPLOAD DOCUMENTS
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

          {/* 🚫 Upload Button Removed */}
          <div></div>
        </div>

        {/* Page Heading & Files Section */}
        <div className="w-full px-6 mb-6">
          <h2 className="text-2xl font-semibold text-black mb-4">
            1679 LAST UPDATED : 17 SEP
          </h2>

          <div className="flex items-center justify-center gap-10 flex-wrap">
            {files.map((file, idx) => (
              <div
                key={idx}
                onClick={() => router.push("/UserLogin/ConversionPayment")}
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
              >
                <FileText className="w-14 h-14 text-blue-600" />
                <p className="text-md font-semibold text-black mt-2">
                  {file.name}
                </p>
              </div>
            ))}
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

export default UserFolder;
