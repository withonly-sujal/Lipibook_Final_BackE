"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, Trash2, FileText, HelpCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function AdminFolder() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [files, setFiles] = useState([
    { name: "1679 MODIDOC V1" },
    { name: "1679 MODIDOC V2" },
  ]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileToDelete, setFileToDelete] = useState(null); // file pending deletion
  const cardRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSignOut = () => router.push("/Admin-panel/admin-login");

  const openCard = () => setShowCard(true);
  const closeCard = () => setShowCard(false);

  // Attach file
  const handleAttach = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) setSelectedFile(event.target.files[0]);
  };

  const uploadFile = () => {
    if (!selectedFile) {
      alert("Please attach a file first!");
      return;
    }
    const newFile = { name: selectedFile.name };
    setFiles((prev) => [...prev, newFile]);
    setSelectedFile(null);
    closeCard();
    alert(`${newFile.name} uploaded successfully!`);
  };

  // Confirm deletion
  const confirmDelete = (fileName) => {
    setFileToDelete(fileName);
  };

  const deleteFile = () => {
    if (fileToDelete) {
      setFiles((prev) => prev.filter((file) => file.name !== fileToDelete));
      setFileToDelete(null);
    }
  };

  const cancelDelete = () => setFileToDelete(null);

  // Click outside to hide central card
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) closeCard();
    };
    if (showCard) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCard]);

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
        {/* Top Row: Sidebar + Upload Button */}
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
                <button onClick={() => router.push("/Admin-panel/admin-home")} className="w-full text-left px-4 py-3 hover:bg-gray-800">
                  UPLOAD DOCUMENTS
                </button>
                <button
                    onClick= {() => router.push("/Admin-panel/admin-manage1")}
                    className="w-full text-left px-4 py-3 hover:bg-gray-800"
                >
                MANAGE (STORAGE)
                </button>
                <button onClick={handleSignOut} className="w-full text-left px-4 py-3 hover:bg-gray-800 border-t border-gray-700">
                  SIGN OUT
                </button>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <button
            onClick={openCard}
            className="flex flex-col items-center text-black hover:scale-110 transition-transform duration-200"
          >
            <div className="w-8 h-8 flex items-center justify-center border-2 border-black rounded-full text-lg font-bold">+</div>
            <span className="text-xs font-semibold mt-1">UPLOAD</span>
          </button>
        </div>

        {/* Page Heading & Files Section */}
        <div className="w-full px-6 mb-6">
          <h2 className="text-2xl font-semibold text-black mb-4">1679 LAST UPDATED : 17 SEP</h2>

          <div className="flex items-center justify-center gap-10 flex-wrap">
            {files.map((file, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <FileText className="w-14 h-14 text-blue-600" />
                <p className="text-md font-semibold text-black mt-2">{file.name}</p>
                <Trash2
                  className="text-red-600 mt-1 cursor-pointer"
                  onClick={() => confirmDelete(file.name)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Central Upload Card */}
        {showCard && (
          <div
            ref={cardRef}
            className="bg-[#F5EAD7] border border-gray-300 rounded-xl shadow-md w-full max-w-md flex flex-col items-center py-8 px-4 absolute top-1/4 left-1/2 -translate-x-1/2"
          >
            {/* Hidden file input */}
            <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />

            <button
              onClick={handleAttach}
              className="bg-[#2D2620] text-white px-8 py-2 rounded-md mb-4 hover:bg-[#3a2f25] transition-colors"
            >
              Attach
            </button>

            {selectedFile && <p className="text-[#2D2620] font-medium mb-1">🖋 {selectedFile.name}</p>}

            <div className="flex items-center gap-6 mt-2 mb-6">
              <p className="text-[#2D2620]">Current folder</p>
              <label className="flex items-center gap-2">
                <input type="radio" name="saveMode" checked readOnly className="accent-[#2D2620]" />
                <span className="text-[#2D2620]">Autosave</span>
              </label>
            </div>

            <button
              onClick={uploadFile}
              className="bg-[#2D2620] text-white px-6 py-2 rounded-md hover:bg-[#3a2f25] transition-colors"
            >
              Upload
            </button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {fileToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-70 z-50">
            <div className="bg-white rounded-lg p-6 w-120 flex flex-col items-center">
              <p className="text-gray-800 text-lg font-medium mb-6 text-center">
                Do you want to delete <br /> <span className="font-bold">{fileToDelete}</span> permanently?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 rounded-md text-black border border-gray-400 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteFile}
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
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

export default AdminFolder;
