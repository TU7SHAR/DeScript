"use client";

import React, { useState } from "react";

function Page() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [apiId, setApiId] = useState("");
  const [apiHash, setApiHash] = useState("");

  const handleGetOtp = async () => {
    try {
      const response = await fetch("/api/getOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await response.json();
      console.log("Get OTP response:", data);
    } catch (error) {
      console.error("Error getting OTP:", error);
    }
  };

  const handleStart = async () => {
    try {
      const response = await fetch("/api/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp, apiId, apiHash }),
      });
      const data = await response.json();
      console.log("Start response:", data);
    } catch (error) {
      console.error("Error starting process:", error);
    }
  };

  return (
    <div className="xl:max-w-7xl lg:max-w-4xl md:max-w-2xl max-w-md mx-auto bg-gray-900 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Telegram Script</h2>
      <div className="mb-4">
        <label
          className="block text-gray-600 text-sm font-bold mb-2"
          htmlFor="phone-number"
        >
          Phone Number
        </label>
        <input
          id="phone-number"
          type="text"
          placeholder="Enter your phone number with country code +911234567890"
          className="no-spinner w-full px-3 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-0 focus:transparent"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-600 text-sm font-bold mb-2"
          htmlFor="apihash"
        >
          API Hash
        </label>
        <input
          id="apihash"
          type="text"
          placeholder="Get your API hash from https://my.telegram.org/apps"
          className="w-full no-spinner px-3 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-0 focus:transparent"
          value={apiHash}
          onChange={(e) => setApiHash(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-600 text-sm font-bold mb-2"
          htmlFor="apiid"
        >
          API ID
        </label>
        <input
          id="apiid"
          type="text"
          placeholder="Get your API ID from https://my.telegram.org/apps"
          className="w-full no-spinner px-3 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-0 focus:transparent"
          value={apiId}
          onChange={(e) => setApiId(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-600 text-sm font-bold mb-2"
          htmlFor="otp"
        >
          OTP
        </label>
        <input
          id="otp"
          type="text"
          placeholder="Get your OTP from Telegram"
          className="w-full no-spinner px-3 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-0 focus:transparent"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>
      <div className="flex space-x-4">
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleGetOtp}
        >
          Get OTP
        </button>
        <button
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none"
          onClick={handleStart}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default Page;
