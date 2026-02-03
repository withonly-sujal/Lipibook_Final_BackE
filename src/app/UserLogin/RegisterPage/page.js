'use client'
import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { api } from '@/lib/api';

export default function NewAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate passwords match
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Validate password strength
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      console.log('Creating account for:', email);

      // Step 1: Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('Firebase user created:', user.uid);

      // Step 2: Get Firebase ID token
      const idToken = await user.getIdToken();

      // Store token in localStorage for API calls
      localStorage.setItem('firebaseToken', idToken);

      // Step 3: Register user in backend (creates Firestore document)
      const displayName = email.split('@')[0]; // Use email prefix as display name
      const response = await api.register(email, password, displayName, 'user');

      console.log('Backend registration successful:', response);

      // Success! Redirect to login page
      alert('Account created successfully! Please login.');
      router.push('/UserLogin/LoginPage');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Failed to create account. Please try again.');
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
          NEW ACCOUNT
        </h2>

        {/* Error Message */}
        {error && (
          <div className="w-60 sm:w-72 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )}

        {/* Form Section */}
        <form
          onSubmit={handleCreateAccount}
          className="flex flex-col items-center space-y-4 sm:space-y-5"
        >
          {/* Email */}
          <input
            type="email"
            placeholder="EMAIL ADDRESS"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            suppressHydrationWarning
            className="w-60 sm:w-72 px-4 py-2 bg-white border border-[#b8a898] rounded-md text-sm focus:outline-none focus:border-[#8b4513] focus:ring-1 focus:ring-[#8b4513] placeholder-[#6b5d52] text-center text-black transition-all disabled:opacity-50"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="PASSWORD (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            suppressHydrationWarning
            className="w-60 sm:w-72 px-4 py-2 bg-white border border-[#b8a898] rounded-md text-sm focus:outline-none focus:border-[#8b4513] focus:ring-1 focus:ring-[#8b4513] placeholder-[#6b5d52] text-center text-black transition-all disabled:opacity-50"
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="CONFIRM PASSWORD"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            suppressHydrationWarning
            className="w-60 sm:w-72 px-4 py-2 bg-white border border-[#b8a898] rounded-md text-sm focus:outline-none focus:border-[#8b4513] focus:ring-1 focus:ring-[#8b4513] placeholder-[#6b5d52] text-center text-black transition-all disabled:opacity-50"
          />

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={loading}
            suppressHydrationWarning
            className="w-36 sm:w-40 bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-[#1a1a1a] transition-colors duration-200 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
          </button>
        </form>
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
