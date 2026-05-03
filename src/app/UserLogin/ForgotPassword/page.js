'use client'
import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email.trim()) {
      setError('Please enter your email address.');
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSuccess(true);
    } catch (error) {
      console.error('Password reset error:', error);

      let errorMessage = 'Failed to send reset email. Please try again.';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please try again later.';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleHelpClick = () => {
    console.log('Help button clicked!');
  };

  return (
    <div className="h-screen w-screen bg-[#e8d7c3] flex flex-col justify-between overflow-hidden">
      
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

      {/* ---------------- MAIN ---------------- */}
      <main className="flex flex-1 flex-col items-center justify-center text-center space-y-6 sm:space-y-8">
        
        {/* Logo */}
        <Image
          src="/images/lipibook.png"
          alt="LipiBook Logo"
          width={130}
          height={50}
          priority
          className="w-28 sm:w-32 md:w-40"
        />

        {/* Title */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2c1810] tracking-wide">
          FORGOT PASSWORD
        </h2>

        {!success ? (
          /* Input + Button */
          <form onSubmit={handleSendResetLink} className="flex flex-col items-center space-y-4">
            {/* Error Message */}
            {error && (
              <div className="w-60 sm:w-72 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm text-center">
                {error}
              </div>
            )}

            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-60 sm:w-72 px-4 py-2 bg-white border border-[#b8a898] rounded-md text-sm focus:outline-none focus:border-[#8b4513] focus:ring-1 focus:ring-[#8b4513] placeholder-[#6b5d52] text-center text-black transition-all disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-36 sm:w-40 bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-[#1a1a1a] transition-colors duration-200 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'SENDING...' : 'SEND RESET LINK'}
            </button>

            <button
              type="button"
              onClick={() => router.push('/UserLogin/LoginPage')}
              className="text-[#2c1810] text-xs sm:text-sm hover:text-[#8b4513] hover:underline transition-colors duration-200"
            >
              BACK TO LOGIN
            </button>
          </form>
        ) : (
          /* Success Message */
          <div className="flex flex-col items-center space-y-4">
            <div className="w-60 sm:w-72 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-sm text-center">
              <p className="font-semibold mb-1">✅ Reset Link Sent!</p>
              <p>We sent a password reset link to <strong>{email}</strong>. Please check your inbox (and spam folder).</p>
            </div>

            <button
              onClick={() => router.push('/UserLogin/LoginPage')}
              className="w-36 sm:w-40 bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-[#1a1a1a] transition-colors duration-200 tracking-wide"
            >
              BACK TO LOGIN
            </button>
          </div>
        )}
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
