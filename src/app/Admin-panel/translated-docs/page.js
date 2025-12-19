"use client";

import React from "react";
import { ArrowLeft, Download, HelpCircle } from "lucide-react";
import { Feather } from "react-feather";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TranslatedDocs() {
  const router = useRouter();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "translated_doc.png";
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e8d7c3] relative">
      {/* ===== HEADER ===== */}
      <header className="w-full px-6 py-4 flex items-center justify-between bg-[#F5E6D3] border-b border-[#d4c4b0]">
        {/* Left Logo */}
        <div className="flex items-center">
          <Image
            src="/images/rgstc.png"
            alt="RGSTC Logo"
            width={55}
            height={55}
            className="w-12 h-12 sm:w-14 sm:h-14"
          />
        </div>

        {/* Center Title */}
        <h1 className="text-center text-black text-lg sm:text-xl lg:text-2xl font-bold leading-tight">
          RGSTC MUMBAI IN COLLABORATION WITH VIT, PUNE
        </h1>

        {/* Right Admin ID */}
        <p className="text-sm font-semibold text-gray-700 whitespace-nowrap ml-4">
          ADMIN ID
        </p>
      </header>

      {/* ===== MAIN SECTION ===== */}
      <main className="flex flex-col items-center justify-center flex-1 px-6 text-center relative">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 flex items-center gap-2 text-black hover:underline"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="hidden sm:inline font-medium">Back</span>
        </button>

        {/* Feather icon */}
        <div className="flex justify-center mb-4 mt-4">
          <Feather className="w-14 h-14 text-[#2c1810]" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#2c1810] mb-6">
          Translated Document
        </h2>

        

        {/* Translated parchment document */}

        {/* Download Button (TOP-RIGHT) */}
          <button
            onClick={handleDownload}
            className="absolute top-5 right-0 bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 transition"
          >
            Download
            <Download className="w-4 h-4" />
          </button>

        <div className="relative mb-8">
          <Image
            src="/images/translated-doc.png"
            alt="Translated Document"
            width={450}
            height={600}
            className="rounded-md shadow-md border border-[#bfa58a]"
          />

        </div>

        {/* Timestamp */}
        <p className="text-sm text-black font-medium">
          26 July 2025 : 4:30 GMT+
        </p>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#e8d7c3] px-3 py-3 border-t border-[#d4c4b0] flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
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
