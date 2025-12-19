'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, ArrowLeft, HelpCircle } from 'lucide-react'; // Added HelpCircle
import Image from 'next/image'; // Required for the Logo

export default function ConversionPayment() {
  const router = useRouter();
  const searchParams = useSearchParams(); 
  
const handlePayment = () => {
    // ------------------------------------------------------------------
    // CRITICAL: This is where the backend API call for payment initiation happens.
    // ------------------------------------------------------------------

    const amount = '30.00';
    const recipientUpiId = 'recipient@upi';
    const recipientName = 'ModiDocsService';
    
    // Redirect the user to the payment app (or payment gateway URL)
    const paymentUrl = `upi://pay?pa=${recipientUpiId}&pn=${recipientName}&am=${amount}&cu=INR`;
    
    console.log(`Redirecting to payment URL: ${paymentUrl}`);
    
    // 1. INITIATE EXTERNAL REDIRECT
    // This will open the UPI app/payment gateway. 
    // We use window.location.href to prioritize the deep link action.
    window.location.href = paymentUrl;

    // 2. IMMEDIATE INTERNAL REDIRECT
    // We also immediately navigate to the success page to show the user a message,
    // assuming a background process (webhook) will confirm payment later.
    // NOTE: This internal navigation usually happens after a *successful* API call
    // to your backend, but this simplified front-end flow works for UI purposes.
    router.push('/UserLogin/PaymentSuccess'); 
  };
  const handleCancel = () => {
    // Navigate back to the main upload page 
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
            
            {/* Back Button (Moved into main area but positioned absolutely) */}
            <button
                onClick={handleCancel}
                className="absolute top-4 left-4 p-3 text-[#2c1810] hover:text-[#8b4513] transition-colors flex items-center"
            >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Upload
            </button>

            {/* Payment Box Container (Centered) */}
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full border border-gray-300">
                
                {/* Header */}
                <div className="text-center mb-6">
                    <p className="text-lg font-bold text-[#2c1810] mb-1">ONE TIME</p>
                    <p className="text-5xl font-bold text-black mb-1">₹ 30</p>
                    <p className="text-sm text-gray-600">Initial Amount</p>
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
                
                {/* Payment Button */}
                <button
                    onClick={handlePayment}
                    className="w-full bg-black text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#1a1a1a] transition-colors"
                >
                    PROCEED TO PAY
                </button>
                
                {/* Cancel button */}
                 <button
                    onClick={handleCancel}
                    className="w-full mt-3 text-[#2c1810] text-sm hover:text-[#8b4513] transition-colors"
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