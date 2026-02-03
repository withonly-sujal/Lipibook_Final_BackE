'use client';

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Allowed admin email - only this email can access admin panel
const ALLOWED_ADMIN_EMAIL = 'admin@gmail.com';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check if email is the allowed admin email
      if (email.toLowerCase() !== ALLOWED_ADMIN_EMAIL.toLowerCase()) {
        throw new Error('Access denied. This email is not authorized for admin access.');
      }

      console.log('Signing in admin:', email);

      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('Admin signed in:', user.uid);

      // Get Firebase ID token
      const idToken = await user.getIdToken();

      // Store token in localStorage
      localStorage.setItem('firebaseToken', idToken);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', 'admin');

      // Success! Redirect to admin home
      alert('Admin login successful!');
      router.push('/Admin-panel/admin-home');
    } catch (error) {
      console.error('Login error:', error);

      // User-friendly error messages
      let errorMessage = 'Login failed. Please try again.';

      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No admin account found with this email.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (error.message.includes('Access denied')) {
        errorMessage = error.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgetPassword = () => {
    router.push('/Admin-panel/admin-forgotpass');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e8d7c3]">
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

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 w-full overflow-hidden">
        {/* Logo */}
        <div className="text-center mb-4 sm:mb-6">
          <Image
            src="/images/lipibook.png"
            alt="LipiBook Logo"
            width={120}
            height={100}
            className="mx-auto w-auto h-auto"
          />
        </div>

        {/* Login Box */}
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/4 px-4 sm:px-6 bg-[#e8d7c3]">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 text-black">
            ADMINISTRATIVE LOGIN SYSTEM
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm text-center">
              {error}
            </div>
          )}

          {/* Info Message */}
          <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-2 rounded text-xs text-center">
            <p className="font-semibold">🔒 Restricted Access</p>
            <p>Administrator credentials required</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-3 sm:space-y-4 flex flex-col items-center">
            <input
              type="email"
              placeholder="ADMIN EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-md outline-none border border-[#b8a898] bg-white placeholder-[#6b5d52] focus:border-[#8b4513] focus:ring-1 focus:ring-[#8b4513] disabled:opacity-50"
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-md outline-none border border-[#b8a898] bg-white placeholder-[#6b5d52] focus:border-[#8b4513] focus:ring-1 focus:ring-[#8b4513] disabled:opacity-50"
            />

            {/* Centered Sign In Button (half width) */}
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 bg-black text-white py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-md hover:bg-gray-800 transition-colors mx-auto block disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>

            <button
              type="button"
              onClick={handleForgetPassword}
              className="text-[#2c1810] text-sm sm:text-base hover:text-[#8b4513] hover:underline transition-colors mt-1"
            >
              FORGOT PASSWORD?
            </button>
          </form>
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
