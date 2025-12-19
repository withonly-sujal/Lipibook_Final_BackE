"use client";

import React from "react";
import { ArrowLeft, Download, HelpCircle, Feather, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TranslatedDocs() {
  const router = useRouter();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "translated_doc.png";
    link.click();
    console.log("Download initiated for translated_doc.png");
  };

  const handleHelpClick = () => {
    console.log("Help button clicked on Translated Docs page!");
  };

  const handleGoToUpload = () => {
    router.push("/UserLogin/UploadPage");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e8d7c3] relative">
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

      {/* ===== MAIN SECTION ===== */}
      <main className="flex flex-col items-center flex-1 px-6 text-center relative py-8 overflow-y-auto">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 flex items-center gap-2 text-black hover:underline z-10"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="hidden sm:inline font-medium">Back</span>
        </button>

        {/* ---- Download & Upload Buttons (Top Right Corner) ---- */}
        <div className="absolute top-6 right-6 flex flex-col items-end gap-3 z-10">
          <button
            onClick={handleDownload}
            className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 transition"
          >
            Download
            <Download className="w-4 h-4" />
          </button>

        </div>

        {/* Feather icon (Writing/Translation) */}
        <div className="flex justify-center mb-4 mt-4">
          <Feather className="w-14 h-14 text-[#2c1810]" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#2c1810] mb-6">
          Translated Document
        </h2>

        {/* Translated parchment document */}
        <div className="relative mb-4">
          <Image
            src="/images/translated-doc.png"
            alt="Translated Document"
            width={450}
            height={600}
            className="rounded-md shadow-md border border-[#bfa58a]"
          />
        </div>

        {/* Timestamp */}
        <p className="text-sm text-black font-medium mb-8">
          26 July 2025 : 4:30 GMT+
        </p>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#e8d7c3] px-3 py-3 border-t border-[#d4c4b0] flex-shrink-0">
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          <div className="flex-1"></div>
          <p className="text-[#2c1810] text-xs sm:text-sm md:text-base text-center flex-1">
            <b>भारत इतिहास संशोधक मंडळ, पुणे | LipiBook</b>
          </p>
          <div className="flex-1 flex justify-end">
            <button 
              onClick={handleHelpClick}
              className="text-[#5c3d2e] hover:text-[#8b4513] transition-colors duration-200"
            >
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
