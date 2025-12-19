'use client';
import React, { useState } from 'react';
import { FileText, Calendar, AlertCircle, LogOut, HelpCircle, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const LipiBookDashboard = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [reportTitle, setReportTitle] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [selectedLocation, setSelectedLocation] = useState('Pune, Maharashtra');
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const periods = ['This Month', 'Last Month', 'This Quarter', 'This Year'];
  const locations = ['Pune, Maharashtra', 'Mumbai, Maharashtra', 'Delhi', 'Bangalore, Karnataka'];
  const router = useRouter();

  const handleLogout = () => {
    router.push('/Committee-Panel/commitee-login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5E6D3]">
      {/* Header */}
      <header className="px-4 sm:px-6 py-3 sm:py-4 bg-[#F5E6D3] border-b border-[#d4a574]">
        <div className="flex items-center justify-between">
          <Image
            src="/images/rgstc.png"
            alt="RGSTC Logo"
            width={48}
            height={48}
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <h1 className="text-center font-semibold text-sm sm:text-lg md:text-xl lg:text-2xl flex-1 text-black px-2">
            RGSTC MUMBAI IN COLLABORATION WITH VIT, PUNE
          </h1>
          <Image
            src="/images/VIT.png"
            alt="VIT Logo"
            width={48}
            height={48}
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-56 xl:w-64 p-4 bg-[#F5E6D3] border-r border-[#d4a574]">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/lipibook.png"
              alt="LipiBook Logo"
              width={90}
              height={90}
              className="w-16 h-16 sm:w-20 sm:h-20"
              priority
            />
          </div>

          <nav className="space-y-2">
            {[
              { name: 'T - Summary', icon: FileText, id: 'summary' },
              { name: 'Updates', icon: Calendar, id: 'updates' },
              { name: 'Report', icon: AlertCircle, id: 'report' },
            ].map(({ name, icon: Icon, id }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center w-full gap-3 px-3 py-2 rounded-md transition ${
                  activeTab === id
                    ? 'bg-[#E8D5BA] font-semibold shadow-sm'
                    : 'hover:bg-[#ecdcc4]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm sm:text-base text-black">{name}</span>
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center w-full gap-3 px-3 py-2 rounded-md hover:bg-[#ecdcc4] transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm sm:text-base text-black">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 bg-[#E8D5BA] text-black">
          {/* Summary Tab */}
          {activeTab === 'summary' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-medium">T - Summary</h2>
                <button className="bg-black text-white px-5 py-2 text-sm sm:text-base rounded-md">
                  Download Summary
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card 1 */}
                <div className="rounded-lg p-4 bg-[#F5E6D3] border border-[#D4A574]">
                  <h3 className="text-base sm:text-lg font-semibold mb-3">Total Transactions</h3>

                  {/* Period Dropdown */}
                  <div className="relative mb-2">
                    <button
                      onClick={() => {
                        setShowPeriodDropdown(!showPeriodDropdown);
                        setShowLocationDropdown(false);
                      }}
                      className="flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <span>{selectedPeriod}</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {showPeriodDropdown && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-md z-10 w-40">
                        {periods.map((period) => (
                          <button
                            key={period}
                            onClick={() => {
                              setSelectedPeriod(period);
                              setShowPeriodDropdown(false);
                            }}
                            className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-100"
                          >
                            {period}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Location Dropdown */}
                  <div className="relative mb-6">
                    <button
                      onClick={() => {
                        setShowLocationDropdown(!showLocationDropdown);
                        setShowPeriodDropdown(false);
                      }}
                      className="flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <span>{selectedLocation}</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {showLocationDropdown && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-md z-10 w-44">
                        {locations.map((location) => (
                          <button
                            key={location}
                            onClick={() => {
                              setSelectedLocation(location);
                              setShowLocationDropdown(false);
                            }}
                            className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-100"
                          >
                            {location}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="text-4xl sm:text-5xl font-medium text-right">200</div>
                </div>

                {/* Card 2 */}
                <div className="rounded-lg p-4 bg-[#F5E6D3] border border-[#D4A574]">
                  <h3 className="text-base sm:text-lg font-semibold mb-6">Total MODISCRIPT DOCX</h3>
                  <div className="text-4xl sm:text-5xl font-medium text-right mt-20">2.5L</div>
                </div>

                {/* Card 3 */}
                <div className="rounded-lg p-4 bg-[#F5E6D3] border border-[#D4A574]">
                  <h3 className="text-base sm:text-lg font-semibold mb-6">Payment Amount</h3>
                  <div className="text-3xl sm:text-4xl font-medium text-right">₹90,000</div>
                </div>

                {/* Card 4 */}
                <div className="rounded-lg p-4 bg-[#F5E6D3] border border-[#D4A574]">
                  <h3 className="text-base sm:text-lg font-semibold mb-6">Other Region Access</h3>
                  <div className="text-2xl sm:text-3xl font-medium text-right">UK, Nepal</div>
                </div>
              </div>
            </div>
          )}

          {/* Updates Tab */}
          {activeTab === 'updates' && (
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-10">Updates</h2>
              <div className="flex flex-col items-center justify-center min-h-[300px]">
                <svg
                  className="w-16 h-16 sm:w-20 sm:h-20 mb-4"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="#8B6F47"
                  strokeWidth="2"
                >
                  <rect x="20" y="15" width="60" height="70" rx="3" />
                  <path d="M35 40 L45 50 L65 30" />
                  <circle cx="35" cy="60" r="3" fill="#8B6F47" />
                  <circle cx="50" cy="60" r="3" fill="#8B6F47" />
                  <circle cx="65" cy="60" r="3" fill="#8B6F47" />
                </svg>
                <p className="text-lg sm:text-xl md:text-2xl">Upcoming feature updates – Event Posters</p>
              </div>
            </div>
          )}

          {/* Report Tab */}
          {activeTab === 'report' && (
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-6 text-center">Report</h2>
              <div className="max-w-2xl mx-auto">
                <label className="block text-sm sm:text-base font-medium mb-2">Title of the Report</label>
                <input
                  type="text"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="w-full px-4 py-2 text-sm sm:text-base border border-[#D4A574] bg-[#F5E6D3] outline-none mb-4 rounded"
                />
                <label className="block text-sm sm:text-base font-medium mb-2">Describe issue / idea</label>
                <textarea
                  rows="6"
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  className="w-full px-4 py-2 text-sm sm:text-base border border-[#D4A574] bg-[#F5E6D3] outline-none resize-none rounded"
                />
                <div className="flex justify-center mt-6">
                  <button className="bg-black text-white px-8 py-2 text-sm sm:text-base rounded">
                    Report
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#E8D7C3] px-4 py-3 border-t border-[#d4c4b0]">
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          <div className="flex-1"></div>
          <p className="text-[#2c1810] text-xs sm:text-sm md:text-base text-center flex-1">
            <b>भारत इतिहास संशोधक मंडळ, पुणे | LipiBook</b>
          </p>
          <div className="flex-1 flex justify-end">
            <button className="text-[#5c3d2e] hover:text-[#8b4513] transition">
              <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LipiBookDashboard;
