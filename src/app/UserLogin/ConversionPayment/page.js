'use client'
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Check, ArrowLeft, HelpCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function ConversionPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Load Razorpay Checkout script dynamically
   */
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      // Check if already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  /**
   * Handle payment flow
   */
  const handlePayment = async () => {
    setError('');
    setLoading(true);

    try {
      // Step 1: Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setError('Failed to load payment gateway. Please check your internet connection.');
        setLoading(false);
        return;
      }

      // Step 2: Get auth token
      const token = localStorage.getItem('firebaseToken');
      if (!token) {
        setError('Please log in again to continue.');
        setLoading(false);
        router.push('/UserLogin/LoginPage');
        return;
      }

      // Step 3: Create order on backend
      const orderResponse = await fetch(`${API_BASE_URL}/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: 3000 }), // ₹30 = 3000 paise
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create payment order');
      }

      const { orderId, amount, currency, keyId } = orderData.data;

      // Step 4: Open Razorpay Checkout
      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: 'LipiBook',
        description: 'Modi to Devanagari Document Conversion',
        order_id: orderId,
        handler: async function (response) {
          // Step 5: Verify payment on backend
          try {
            const verifyResponse = await fetch(`${API_BASE_URL}/payment/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              // Payment verified! Redirect to success page
              const params = new URLSearchParams({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                amount: (amount / 100).toFixed(2),
              });
              router.push(`/UserLogin/PaymentSuccess?${params.toString()}`);
            } else {
              setError('Payment verification failed. Please contact support.');
              setLoading(false);
            }
          } catch (verifyError) {
            console.error('Verification error:', verifyError);
            setError('Payment verification failed. Please contact support.');
            setLoading(false);
          }
        },
        prefill: {
          email: localStorage.getItem('userEmail') || '',
        },
        theme: {
          color: '#2c1810',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            console.log('Payment popup closed by user');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        setError(`Payment failed: ${response.error.description || 'Please try again.'}`);
        setLoading(false);
      });

      razorpay.open();

    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/UserLogin/UploadPage');
  };

  const handleHelpClick = () => {
    console.log('Help button clicked on payment page!');
  };

  return (
    <div className="h-screen w-screen bg-[#e8d7c3] flex flex-col overflow-hidden">
        
        {/* ---------------- START HEADER ---------------- */}
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

        {/* ---------------- MAIN CONTENT (Payment Box) ---------------- */}
        <main className="flex-1 flex flex-col items-center justify-center relative p-4 overflow-auto">
            
            {/* Back Button */}
            <button
                onClick={handleCancel}
                disabled={loading}
                className="absolute top-4 left-4 p-3 text-[#2c1810] hover:text-[#8b4513] transition-colors flex items-center disabled:opacity-50"
            >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Upload
            </button>

            {/* Payment Box Container */}
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full border border-gray-300">
                
                {/* Header */}
                <div className="text-center mb-6">
                    <p className="text-lg font-bold text-[#2c1810] mb-1">ONE TIME</p>
                    <p className="text-5xl font-bold text-black mb-1">₹ 30</p>
                    <p className="text-sm text-gray-600">Document Conversion Fee</p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                    <div className="flex items-center text-[#2c1810]">
                        <Check className="w-5 h-5 text-green-700 mr-2" />
                        <span className="text-sm">ResNet - 9 Latest</span>
                    </div>
                    <div className="flex items-center text-[#2c1810]">
                        <Check className="w-5 h-5 text-green-700 mr-2" />
                        <span className="text-sm">Regenerate upto 4 times</span>
                    </div>
                    <div className="flex items-center text-[#2c1810]">
                        <Check className="w-5 h-5 text-green-700 mr-2" />
                        <span className="text-sm">Different downloadable formats</span>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm text-center">
                    {error}
                  </div>
                )}
                
                {/* Payment Button */}
                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full bg-black text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#1a1a1a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        PROCESSING...
                      </>
                    ) : (
                      'PROCEED TO PAY'
                    )}
                </button>

                {/* Secure Payment Badge */}
                <p className="text-center text-xs text-gray-500 mt-3">
                    🔒 Secured by Razorpay
                </p>
                
                {/* Cancel button */}
                 <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="w-full mt-3 text-[#2c1810] text-sm hover:text-[#8b4513] transition-colors disabled:opacity-50"
                >
                    Cancel
                </button>
            </div>
        </main>

        {/* ---------------- START FOOTER ---------------- */}
        <footer className="bg-[#e8d7c3] px-3 py-3 border-t border-[#d4c4b0] flex-shrink-0">
            <div className="max-w-8xl mx-auto flex items-center justify-between">
                {/* Left Spacer */}
                <div className="flex-shrink-0 w-6 h-6"></div> 
                
                {/* Central Text */}
                <p className="text-[#2c1810] text-xs sm:text-sm md:text-base text-center flex-1">
                    <b>भारत इतिहास संशोधक मंडळ, पुणे | LipiBook</b>
                </p>
                
                {/* Right Help Icon */}
                <button
                    onClick={handleHelpClick}
                    className="text-[#5c3d2e] hover:text-[#8b4513] transition-colors duration-200"
                >
                    <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            </div>
        </footer>
        {/* ---------------- END FOOTER ---------------- */}
    </div>
  );
}

export default function ConversionPayment() {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen bg-[#e8d7c3] flex items-center justify-center">
        <div className="text-[#2c1810] text-lg font-medium">Loading payment...</div>
      </div>
    }>
      <ConversionPaymentContent />
    </Suspense>
  );
}