"use client";

import React, { useState } from "react";
import { Menu, HelpCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

function AdminManageStorage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // 📂 Initial folders
  const [folders, setFolders] = useState([
    { name: "Shivkalin" },
    { name: "Peshwakalin" },
  ]);

  // 🔒 Sign out handler
  const handleSignOut = () => router.push("/Admin-panel/admin-login");

  // ➕ Add folder
  const handleAddFolder = () => {
    const folderName = prompt("Enter new folder name:");
    if (!folderName) return;

    const formattedName = folderName.trim();
    if (formattedName === "") {
      alert("Folder name cannot be empty!");
      return;
    }

    // check for duplicates
    if (folders.some((f) => f.name.toLowerCase() === formattedName.toLowerCase())) {
      alert("A folder with this name already exists!");
      return;
    }

    const newFolder = { name: formattedName };
    setFolders([...folders, newFolder]);
    alert(`Folder "${formattedName}" added successfully!`);
  };

  // 📁 Navigate to next page (Manage2)
  const handleFolderClick = (folder) => {
    router.push(`/Admin-panel/admin-manage2?folder=${encodeURIComponent(folder.name)}`);
  };

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
      <main className="flex flex-col items-center flex-1 px-4 text-center mt-5">
        {/* Sidebar + Add Folder */}
        <div className="w-full flex justify-between items-center px-6 mb-4">
          {/* === Menu === */}
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

          {/* === Add Folder Button === */}
          <button
            onClick={handleAddFolder}
            className="flex flex-col items-center text-black hover:scale-110 transition-transform duration-200"
          >
            <div className="w-8 h-8 flex items-center justify-center border-2 border-black rounded-full text-lg font-bold">
              +
            </div>
            <span className="text-xs font-semibold mt-1">ADD FOLDER</span>
          </button>
        </div>

        {/* === Title === */}
        <h2 className="text-2xl font-semibold text-black mb-8">
          MANAGE STORAGE (DOC FOLDERS)
        </h2>

        {/* === Folder Grid === */}
        <div className="flex items-center justify-center gap-16 flex-wrap">
          {folders.map((folder, idx) => (
            <div
              key={idx}
              onClick={() => handleFolderClick(folder)}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <FontAwesomeIcon
                icon={faFolder}
                className="text-sky-600"
                style={{ fontSize: "60px" }}
              />
              <p className="mt-2 text-lg font-semibold text-[#2D2620]">
                {folder.name}
              </p>
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
          <button className="text-[#5c3d2e] hover:text-[#8b4513] transition-colors duration-200">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default AdminManageStorage;
