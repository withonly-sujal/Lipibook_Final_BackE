"use client";

import React, { useState } from "react";
import { Menu, HelpCircle, Search, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

function UserFolderView() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);

  const [folders] = useState([
    "Default Uploads",
    "1770",
    "1850",
    "1600",
    "1679",
    "1820",
    "1740",
    "1780",
    "1819",
    "1742",
  ]);

  const docs = ["Doc1.pdf", "Doc2.docx", "Doc3.txt", "Summary.pdf"];

  const filteredFolders = folders.filter((f) =>
    f.toLowerCase().includes(search.toLowerCase())
  );

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
      <main className="flex flex-col items-center flex-1 px-4 text-center mt-5">
        {/* Sidebar */}
        <div className="w-full flex justify-between items-center px-6 mb-4">
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

          {/* Upload button removed */}
          <div></div>
        </div>

        {/* ===== CONTENT ===== */}
        {!selectedFolder ? (
          <>
            <h2 className="text-2xl font-semibold text-black mb-6">
              MANAGE STORAGE (DOC FOLDERS)
            </h2>

            {/* Search bar */}
            <div className="flex items-center border border-black rounded-md px-3 py-2 mb-8 w-[90%] sm:w-[70%] lg:w-[50%] bg-[#e8d7c3]">
              <Search className="w-5 h-5 text-black mr-2" />
              <input
                type="text"
                placeholder="SEARCH DOCS (BY YEAR / FOLDER)"
                className="flex-1 bg-transparent outline-none text-black text-center placeholder-black font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Folder grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {filteredFolders.map((folder, index) => (
                <div
                  key={index}
                  onClick={() =>
                    router.push(
                      `/UserLogin/user-folder?name=${encodeURIComponent(
                        folder
                      )}`
                    )
                  }
                  className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200"
                >
                  <FontAwesomeIcon
                    icon={faFolder}
                    className="text-sky-600"
                    style={{ fontSize: "60px" }}
                  />
                  <p className="mt-2 text-[16px] font-semibold text-[#2D2620]">
                    {folder}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* ===== Inside folder view ===== */
          <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setSelectedFolder(null)}
                className="flex items-center gap-2 text-black font-semibold hover:underline"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <h2 className="text-2xl font-bold text-black">
                Folder: {selectedFolder}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
              {docs.map((doc, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                >
                  <FontAwesomeIcon
                    icon={faFileAlt}
                    className="text-sky-400"
                    style={{ fontSize: "70px" }}
                  />
                  <p className="mt-2 text-[15px] text-[#2D2620] font-medium">
                    {doc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#e8d7c3] px-3 py-3 border-t border-[#d4c4b0] flex-shrink-0">
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          <div className="w-6 h-6"></div>
          <p className="text-[#2c1810] text-xs sm:text-sm md:text-base text-center flex-1">
            भारत इतिहास संशोधक मंडळ, पुणे | LipiBook
          </p>
          <button className="text-[#5c3d2e] hover:text-[#8b4513] transition-colors duration-200">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default UserFolderView;
