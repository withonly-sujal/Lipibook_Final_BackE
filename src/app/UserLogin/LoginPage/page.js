'use client';

import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function UserLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // --- Navigation Handlers ---
  const handleSignIn = () => {
    router.push('/UserLogin/UploadPage');
  };

  const handleForgotPassword = () => {
    router.push('/UserLogin/ForgotPassword');
  };

  const handleCreateAccount = () => {
    router.push('/UserLogin/RegisterPage');
  };

  const handleHelpClick = () => {
    console.log('Help button clicked!');
  };

  return (
    <div className="h-screen w-screen bg-[#e8d7c3] flex flex-col overflow-hidden">
      {/* ---------------- HEADER ---------------- */}
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

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex-1 flex items-center justify-center px-3 py-3 sm:px-4 sm:py-4 overflow-y-auto">
        <div className="flex flex-col items-center w-full max-w-md">
          {/* Logo */}
          <div className="mb-3 sm:mb-4">
            <Image
              src="/images/lipibook.png"
              alt="LipiBook Logo"
              width={150}
              height={60}
              priority
              className="w-28 h-auto sm:w-36 md:w-40"
            />
          </div>

          {/* Title */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-5 text-[#2c1810] tracking-wide">
            USER LOGIN
          </h2>

          {/* ---------------- LOGIN FORM ---------------- */}
          <div className="flex flex-col items-center space-y-4 w-full">
            {/* Username Input */}
            <input
              type="text"
              placeholder="USERNAME / EMAIL"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-64 sm:w-72 md:w-80 px-3 py-2 bg-white border border-[#b8a898] rounded text-sm focus:outline-none focus:border-[#8b4513] focus:ring-1 focus:ring-[#8b4513] placeholder-[#6b5d52] transition-all text-center text-black"
            />

            {/* Password Input */}
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-64 sm:w-72 md:w-80 px-3 py-2 bg-white border border-[#b8a898] rounded text-sm focus:outline-none focus:border-[#8b4513] focus:ring-1 focus:ring-[#8b4513] placeholder-[#6b5d52] transition-all text-center text-black"
            />

            {/* Forgot Password */}
            <div className="text-right w-64 sm:w-72 md:w-80">
              <button
                onClick={handleForgotPassword}
                className="text-[#2c1810] text-xs sm:text-sm hover:text-[#8b4513] hover:underline transition-colors duration-200"
              >
                FORGOT PASSWORD?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleSignIn}
              className="w-40 bg-black text-white py-2.5 rounded text-sm font-medium hover:bg-[#1a1a1a] transition-colors duration-200"
            >
              SIGN IN
            </button>

            {/* Create Account */}
            <button
              onClick={handleCreateAccount}
              className="text-[#2c1810] text-xs sm:text-sm hover:text-[#8b4513] hover:underline transition-colors duration-200 font-medium"
            >
              NEW USER? CREATE ACCOUNT
            </button>
          </div>
        </div>
      </main>

      {/* ---------------- FOOTER ---------------- */}
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
