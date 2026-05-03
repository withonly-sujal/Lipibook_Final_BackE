'use client'
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, HelpCircle, FileText } from 'lucide-react';
import Image from 'next/image';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams(); 

  // Get real transaction data from URL params
  const paymentId = searchParams.get('paymentId') || 'N/A';
  const orderId = searchParams.get('orderId') || 'N/A';
  const amount = searchParams.get('amount') || '30.00';

  // Current time for display
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const currentDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  const transactionDetails = {
    amount: `₹ ${amount}`,
    type: 'One-Time Conversion Fee',
    mode: 'Razorpay (Card/UPI/Netbanking)',
    paymentId: paymentId,
    orderId: orderId,
    time: currentTime,
    date: currentDate,
  };

  const handleViewDocument = () => {
    router.push('/UserLogin/TranslatedDocs'); 
  };
  
  const handleHelpClick = () => {
    console.log('Help button clicked on success page!');
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

        {/* ---------------- MAIN CONTENT (Success Message) ---------------- */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 overflow-auto">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full border border-gray-300 text-center">
                
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-2">
                    Payment Successful!
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                    Your document conversion is now being processed.
                </p>

                {/* Transaction Details Table */}
                <div className="text-left space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-base font-bold text-[#2c1810] mb-2 border-b pb-2">
                        Transaction Details
                    </h3>
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-600">Amount Paid:</span>
                        <span className="font-semibold text-black">{transactionDetails.amount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-600">Payment Type:</span>
                        <span className="font-semibold text-black">{transactionDetails.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-600">Payment Mode:</span>
                        <span className="font-semibold text-black">{transactionDetails.mode}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-600">Payment ID:</span>
                        <span className="font-semibold text-black text-xs break-all">{transactionDetails.paymentId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-600">Order ID:</span>
                        <span className="font-semibold text-black text-xs break-all">{transactionDetails.orderId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-600">Time & Date:</span>
                        <span className="font-semibold text-black">{transactionDetails.time} on {transactionDetails.date}</span>
                    </div>
                </div>

                {/* View Document Button */}
                <button
                    onClick={handleViewDocument}
                    className="mt-8 bg-[#8b4513] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#5c3d2e] transition-colors flex items-center justify-center mx-auto"
                >
                    <FileText className="w-5 h-5 mr-2" /> View Document
                </button>
            </div>
        </main>

        {/* ---------------- START FOOTER ---------------- */}
        <footer className="bg-[#e8d7c3] px-3 py-3 border-t border-[#d4c4b0] flex-shrink-0">
            <div className="max-w-8xl mx-auto flex items-center justify-between">
                <div className="flex-shrink-0 w-6 h-6"></div> 
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
        {/* ---------------- END FOOTER ---------------- */}
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen bg-[#e8d7c3] flex items-center justify-center">
        <div className="text-[#2c1810] text-lg font-medium">Loading...</div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}