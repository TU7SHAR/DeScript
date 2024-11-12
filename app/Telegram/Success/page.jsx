"use client";

import React from "react";
import { useSearchParams } from "next/navigation.js";
import Link from "next/link";

function page() {
  let out = useSearchParams().get("out");
  const ctr = (out.match(/successfully left/gi) || []).length;
  out = out.replace(/}$/, "");
  console.log(out);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className=" p-8 bg-gray-900 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Script Success</h1>
        <p className="text-gray-500  whitespace-pre-wrap">
          {out ? out : "Loading..."}
        </p>
        <p className="text-gray-500 mb-4 whitespace-pre-wrap">
          Groups Left = {ctr}
        </p>
        <Link href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

export default page;
