'use client'
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HelpCircle } from 'lucide-react';

export default function ForgotPasswordLogin() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const router = useRouter();

  const handleSavePassword = (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    console.log("Password reset successful!");
    // After a successful simulated reset, we route to the login page
    router.push('/UserLogin/LoginPage');
  };

  const handleHelpClick = () => {
    console.log('Help button clicked!');
  };

  return (
    <div className="min-h-screen w-full bg-[#e8d7c3] flex flex-col overflow-hidden">
      
      {/* ---------------- HEADER (FIXED: Taller with VIT Logo) ---------------- */}
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
      {/* ---------------- END HEADER ---------------- */}

      {/* MAIN */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm text-center">
          <img src="/images/lipibook.png" alt="LipiBook Logo" className="w-40 h-auto mx-auto mb-10" />
          <h2 className="text-2xl font-bold text-[#2c1810] mb-8 uppercase">FORGOT PASSWORD</h2>

          <form onSubmit={handleSavePassword} className="space-y-6">
            <input
              type="password"
              placeholder="NEW PASSWORD"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 text-center border border-[#d4c4b0] bg-[#f2e7d7] text-black rounded-md focus:outline-none focus:border-[#8b4513]"
              required
              minLength={8}
            />
            <input
              type="password"
              placeholder="CONFIRM PASSWORD"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 text-center border border-[#d4c4b0] bg-[#f2e7d7] text-black rounded-md focus:outline-none focus:border-[#8b4513]"
              required
              minLength={8}
            />
            <button
              type="submit"
              className="w-full bg-black text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-[#1a1a1a] transition"
            >
              SAVE
            </button>
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#e8d7c3] px-3 py-3 border-t border-[#d4c4b0]">
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