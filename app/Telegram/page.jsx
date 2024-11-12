"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [apiId, setApiId] = useState("");
  const [apiHash, setApiHash] = useState("");

  const handleGetOtp = async (event) => {
    event.preventDefault();
    await fetch("/api/getotp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        apiId: apiId,
        apiHash: apiHash,
      }),
    });
  };

  const handleStart = async (event) => {
    event.preventDefault();
    const res = await fetch("/api/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        apiId: apiId,
        apiHash: apiHash,
        otp: otp,
      }),
    });
    const data = await res.json();
    const out = data.output;
    if (res.status === 200) {
      router.push(`/Telegram/Success?out=${encodeURIComponent(out)}`);
    } else {
      console.error("Failed to start process:", data.msg);
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
          htmlFor="api-hash"
        >
          API Hash
        </label>
        <input
          id="api-hash"
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
          htmlFor="api-id"
        >
          API ID
        </label>
        <input
          id="api-id"
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
      <div className="p-4 mt-4 text-white rounded-lg">
        <h2 className="text-xl font-bold mb-4">How to Use the Script ?</h2>

        <h3 className="text-lg font-semibold mb-2">GetOTP Button</h3>
        <p className="mb-2">
          <strong>Purpose:</strong> This button is used to request an OTP (One
          Time Password) for authentication.
        </p>
        <div className="mb-4">
          <strong>Usage:</strong>
          <ul className="list-disc list-inside ml-4">
            <li className="mb-1">
              Fill in the required fields:
              <ul className="list-disc list-inside ml-4">
                <li>
                  <strong>
                    Phone Number with country code such as +910000000000
                  </strong>
                </li>
                <li>
                  <strong>API ID</strong>
                </li>
                <li>
                  <strong>API Hash</strong>
                </li>
                <li>
                  <strong className="text-yellow-300">
                    *Note: You can get your API ID and API Hash from this site{" "}
                    <Link
                      rel="stylesheet"
                      className="bold italic underline"
                      href="https://my.telegram.org/apps"
                    >
                      https://my.telegram.org/apps
                    </Link>
                  </strong>
                </li>
              </ul>
            </li>
            <li className="mb-1">
              Click the <strong>GetOTP</strong> button.
            </li>
            <li className="mb-1">An OTP will be sent to your phone number.</li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold mb-2">Start Button</h3>
        <p className="mb-2">
          <strong>Purpose:</strong> This button is used to start the process of
          leaving Telegram channels/groups after entering the OTP.
        </p>
        <div>
          <strong>Usage:</strong>
          <ul className="list-disc list-inside ml-4">
            <li className="mb-1">
              Ensure you have received the OTP on your phone.
            </li>
            <li className="mb-1">
              Fill in the required fields:
              <ul className="list-disc list-inside ml-4">
                <li>
                  <strong>
                    Phone Number with country code such as +910000000000
                  </strong>
                </li>
                <li>
                  <strong>API ID</strong>
                </li>
                <li>
                  <strong>API Hash</strong>
                </li>
                <li>
                  <strong>OTP</strong> (you received)
                </li>
              </ul>
            </li>
            <li className="mb-1">
              Click the <strong>Start</strong> button.
            </li>
            <li className="mb-1">
              The script will execute and start leaving the specified Telegram
              channels/groups.
            </li>
            <li className="mb-1">
              You will see the output indicating the success or failure of each
              action and the count of groups successfully left.
            </li>
          </ul>
        </div>
        <h2 className="text-xl font-bold mb-4">
          Here all the scripts and usage of code are public the scripts can be
          found at github repo by the name of author TU7SHAR
        </h2>
      </div>
    </div>
  );
}

export default Page;
