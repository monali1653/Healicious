import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AskAI = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  const [disease, setDisease] = useState(query);
  const [symptoms, setSymptoms] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Keep disease state in sync with incoming query param
  useEffect(() => {
    setDisease(query);
  }, [query]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const payload = {
        query,
        disease,
        symptoms,
        ingredients,
      };

      const res = await axios.post("http://localhost:8000/api/v1/ai/ask", payload, {
        headers: { "Content-Type": "application/json" },
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Failed to get a response from AI. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-yellow-50 p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-yellow-600 mb-2">Ask AI Assistant 🤖</h1>
        {query && (
          <p className="text-gray-700 text-sm mb-4">
            You searched for: <span className="font-semibold">{query}</span>
          </p>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Disease</label>
          <input
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            placeholder="Enter a disease (e.g., Diabetes, Thyroid, PCOS)"
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms</label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe your symptoms (comma separated or sentences)..."
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows={3}
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Available ingredients</label>
          <input
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="List available ingredients (comma separated)..."
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 disabled:opacity-60 hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-lg transition-all"
            >
              {loading ? "Generating..." : "Generate recipe"}
            </button>
            <p className="text-xs text-gray-500">The AI will create a step-by-step recipe tailored to your inputs.</p>
          </div>
        </form>

        <div className="mt-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
          )}

          {result && (
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold">{result.title || `AI generated recipe for ${query || "your inputs"}`}</h2>
                {result.source && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    {result.source}
                  </span>
                )}
              </div>

              {result.healthNotes && (
                <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-400 rounded">
                  <h4 className="font-medium text-green-800 mb-1">Health Notes</h4>
                  <p className="text-green-700 text-sm">{result.healthNotes}</p>
                </div>
              )}

              {result.ingredients && result.ingredients.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Ingredients</h3>
                  <ul className="list-disc pl-6 text-gray-700">
                    {result.ingredients.map((ing, idx) => (
                      <li key={idx}>{ing}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.steps && result.steps.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Steps</h3>
                  <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                    {result.steps.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AskAI;
