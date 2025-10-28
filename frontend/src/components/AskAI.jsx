import React from "react";
import { useLocation } from "react-router-dom";

const AskAI = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-6">
      <h1 className="text-3xl font-bold text-yellow-600 mb-4">Ask AI Assistant 🤖</h1>
      <p className="text-gray-700 text-lg mb-8">
        You searched for: <span className="font-semibold">{query}</span>
      </p>

      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg text-center">
        <p className="text-gray-600 mb-4">
          (Here you can integrate an AI chat interface or API later.)
        </p>
        <textarea
          placeholder="Ask your question..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        ></textarea>
        <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-lg transition-all">
          Send
        </button>
      </div>
    </div>
  );
};

export default AskAI;
