"use client";

import React, { useState } from "react";
import { HelpCircle, Upload, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const UserUploadPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();

  // --- Navigation Handlers ---
  const handleSignOut = () => {
    setMenuOpen(false);
    router.push("/UserLogin/LoginPage");
  };

  const handleContribute = () => {
    setMenuOpen(false);
    router.push("/UserLogin/ContributeUs");
  };

  // ACCESS DOCS now routes to Admin storage. If a file is selected, pass it as ?file=
  const handleAccessDocs = () => {
    setMenuOpen(false);
    if (selectedFile) {
      router.push(`/Admin-panel/admin-manage1?file=${encodeURIComponent(selectedFile.name)}`);
    } else {
      router.push("/UserLogin/user-manage1");
    }
  };

  const handleConvert = () => {
    if (!selectedFile) {
      alert("Please upload a file first!");
      return;
    }
    router.push("/UserLogin/ConversionPayment");
  };

  // --- File Upload Handler ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf" || file.type.startsWith("image/")) {
        setSelectedFile(file);
        alert(`File "${file.name}" uploaded successfully ✅`);
      } else {
        alert("Please upload only image or PDF files.");
      }
    }
  };

  // --- Help Button ---
  const handleHelpClick = () => {
    console.log("Help button clicked!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e8d7c3]">
      {/* ---------------- HEADER ---------------- */}
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

        <Image
          src="/images/VIT.png"
          alt="VIT Logo"
          width={50}
          height={50}
          className="w-12 h-12 sm:w-14 sm:h-14"
        />
      </header>

      {/* ---------------- SIDEBAR MENU ---------------- */}
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
              onClick={handleAccessDocs}
              className="w-full text-left px-4 py-3 hover:bg-gray-800"
            >
              ACCESS DOCS
            </button>

            <button
              onClick={handleContribute}
              className="w-full text-left px-4 py-3 hover:bg-gray-800"
            >
              CONTRIBUTE US
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

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6 sm:px-12 lg:px-24 py-8">
        <p className="text-xl sm:text-xl text-[#2c1810] mb-3 font-semibold">
          Welcome! Our platform is dedicated to making historical documents accessible.
        </p>

        <p className="text-lg sm:text-xl text-[#2c1810] max-w-4xl leading-relaxed font-medium">
          Convert your documents from the Modi script <b>(मोडी लिपी)</b> to the modern
          Devanagari script <b>(देवनागरी लिपी)</b>.  
          Preserve your heritage and unlock the knowledge within your manuscripts with our fast and accurate online tool.
        </p>

        {/* Upload Section */}
        <div className="flex flex-col items-center mt-8">
          <input
            type="file"
            id="fileUpload"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <label htmlFor="fileUpload" className="cursor-pointer">
            <Upload className="w-20 h-20 text-[#2c1810] mb-4 hover:scale-110 transition-transform duration-200" />
          </label>

          <h2 className="text-2xl font-semibold text-[#2c1810] mb-6">
            Upload Your ModiDocs
          </h2>

          {/* Toggle */}
          <div className="flex items-center gap-3 mb-4">
            <p className="text-lg text-[#2c1810]">AUTO (Most Compatible)</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoMode}
                onChange={() => setAutoMode(!autoMode)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#8b4513] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-6"></div>
            </label>
          </div>

          <p className="text-sm sm:text-base text-[#2c1810] font-medium mb-8">
            ResNet 9 Thinking  Selected: {autoMode ? "AUTO" : "MANUAL"}
          </p>

          <button
            onClick={handleConvert}
            className="bg-black text-white px-6 py-2 sm:px-8 sm:py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors mt-2"
          >
            Convert to Devnagri
          </button>

          {selectedFile && (
            <p className="text-md text-[#2c1810] font-medium mt-4">
              Selected: <span className="font-semibold">{selectedFile.name}</span>
            </p>
          )}
        </div>
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-[#e8d7c3] px-3 py-3 border-t border-[#d4c4b0] flex-shrink-0">
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          <div className="w-6 h-6"></div>
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
};

export default UserUploadPage;
