"use client";
import { useState } from "react";
import { HelpCircle, Menu, Paperclip } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ContributeUs() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentInfo, setDocumentInfo] = useState("");
  const router = useRouter();

  const handleSignOut = () => {
    setIsMenuOpen(false);
    router.push("/UserLogin/LoginPage");
  };

  const handleHelpClick = () => {
    console.log("Help button clicked on Contribute page!");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log(`File selected: ${file.name}`);
    }
  };

  const handleSendContribution = () => {
    if (!selectedFile) {
      alert("Please attach a document to contribute.");
      return;
    }
    if (documentInfo.trim() === "") {
      alert("Please write a short info about the document.");
      return;
    }

    console.log("--- Document Contribution Submitted ---");
    console.log("File:", selectedFile.name);
    console.log("Info:", documentInfo.trim());

    // Redirect to success page
    router.push("/UserLogin/ContributeSuccess");
  };

  return (
    <div className="min-h-screen w-full bg-[#e8d7c3] flex flex-col overflow-hidden">
      {/* HEADER */}
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

      {/* SIDEBAR MENU */}
      <div className="relative z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="ml-3 mt-3 p-2 hover:bg-[#d4c4b0] rounded transition-colors"
        >
          <Menu className="w-6 h-6 text-black" />
        </button>

        {isMenuOpen && (
          <div className="absolute top-full mt-1 left-3 bg-black text-white rounded-md shadow-lg w-44 overflow-hidden z-50">
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 font-semibold bg-black-600 hover:bg-black-700 transition-colors"
            >
              SIGN OUT
            </button>
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-6 sm:py-10">
        <div className="w-full max-w-md text-center bg-transparent">
          {/* ICON */}
          <img
            src="/images/ContributeLogo.png"
            alt="Contribute Logo"
            className="w-16 h-16 sm:w-40 sm:h-20 mx-auto mb-5 object-contain"
          />

          {/* TITLE */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#2c1810] mb-6">
            Contribute Us
          </h2>

          {/* BOX */}
          <div className="bg-[#f2e7d7] p-6 sm:p-8 rounded-xl shadow-md border border-[#d4c4b0]">
            <input
              type="file"
              id="documentUpload"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* ATTACH BUTTON */}
            <label htmlFor="documentUpload" className="block mb-6 cursor-pointer">
              <div className="bg-black text-white px-8 py-2 rounded-md text-base sm:text-lg font-semibold hover:bg-[#1a1a1a] transition-colors w-full text-center">
                Attach
              </div>
            </label>

            {/* FILE NAME */}
            {selectedFile && (
              <div className="text-center mb-4">
                <p className="text-sm sm:text-base text-[#2c1810] font-semibold flex items-center justify-center">
                  <Paperclip className="w-4 h-4 mr-2" />
                  {selectedFile.name}
                </p>
              </div>
            )}

            {/* SHORT INFO */}
            <input
              type="text"
              placeholder="Write a short info about document"
              value={documentInfo}
              onChange={(e) => setDocumentInfo(e.target.value)}
              className="w-full text-center bg-transparent border-b border-[#2c1810] focus:border-[#8b4513] focus:outline-none py-2 text-sm sm:text-base text-[#2c1810] mb-6"
            />

            {/* SEND BUTTON */}
            <button
              onClick={handleSendContribution}
              className="bg-black text-white px-8 py-2 rounded-md text-base sm:text-lg font-semibold hover:bg-[#1a1a1a] transition-colors w-full"
            >
              Send
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
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
}
