"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [decodedUrl, setDecodedUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const decodeUrl = () => {
    try {
      const params = new URLSearchParams(new URL(url).search);
      const magnetLink = decodeURIComponent(params.get("url"));
      setDecodedUrl(magnetLink);
    } catch (error) {
      alert("Invalid URL! Please enter a valid URL containing a magnet link.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(decodedUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset success message after 2 seconds
    });
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
        <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Ankit's 1337X Link Decoder App
          </h1>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your URL here"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={decodeUrl}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Decode URL
          </button>
          {decodedUrl && (
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-800">
                Decoded Magnet Link:
              </h2>
              <p className="mt-2 bg-gray-100 p-3 rounded-lg border text-sm text-gray-700 break-all">
                {decodedUrl}
              </p>
              <button
                onClick={copyToClipboard}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              >
                Copy to Clipboard
              </button>
              {copySuccess && (
                <p className="mt-2 text-sm text-green-600">
                  Copied to clipboard!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
