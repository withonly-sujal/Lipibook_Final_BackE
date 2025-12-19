'use client'
import { HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ForgotPasswordSuccess() { 
  const router = useRouter();

  const handleBackToPasswordReset = () => {
    console.log('Navigating to ForgotPasswordLogin page...');
    // ✅ Correct routing path (case-sensitive)
    router.push('/UserLogin/ForgotPasswordLogin');
  };

  const handleHelpClick = () => {
    console.log('Help button clicked!');
  }

  return (
    <div className="h-screen w-screen bg-[#e8d7c3] flex flex-col overflow-hidden">
      
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

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center px-3 py-3 sm:px-4 sm:py-4 overflow-y-auto">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center">
          <div className="mb-5 sm:mb-6 md:mb-8">
            <Image src="/images/lipibook.png" alt="LipiBook Logo" width={120} height={50}
              priority className="w-24 h-auto sm:w-28 md:w-32 lg:w-36 mx-auto"
            />
          </div>

          <div className="bg-[#e8d7c3]">
            <p className="text-lg sm:text-xl md:text-2xl text-[#2c1810] italic leading-relaxed mb-2">
              WE SENT RESET LINK
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-[#2c1810] italic leading-relaxed mb-6">
              KINDLY CHECK YOUR MAIL.
            </p>

            <button
              onClick={handleBackToPasswordReset}
              className="bg-black text-white px-6 py-2 rounded text-sm font-medium hover:bg-[#1a1a1a] transition"
            >
              GO TO RESET FORM
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
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
