import { useEffect, useState } from "react";
import Loader from "../components/Loader.jsx";
import api from "../api/axiosInstance.js";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AdminDashboard = () => {
  const [pendingRecipes, setPendingRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingRecipes = async () => {
    try {
      const res = await api.get("/api/v1/admin/pending");
      setPendingRecipes(res.data.data);
    } catch (error) {
      console.error("Failed to fetch pending Recipes", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (recipeId) => {
    try {
      await api.put("/api/v1/admin/approve", {recipeId});
      setPendingRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.error("Approve failed", error);
    }
  };

  const handleReject = async (recipeId) => {

    try {
      await api.put(
        "/api/v1/admin/reject",
        { recipeId }
      );
      setPendingRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.error("Reject failed", error);
    }
  };

  useEffect(() => {
    fetchPendingRecipes();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pending Recipe Submissions</h1>
      {pendingRecipes.length === 0 ? (
        <p>No Recipes pending approval.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pendingRecipes.map((recipe) => (
            <div key={recipe._id} className="border rounded-lg shadow p-4 bg-white">
              <img src={recipe.recipeImage} alt={recipe.recipeName} className="w-full h-60 object-cover rounded mb-4" />
              <h2 className="text-xl font-semibold">{recipe.recipeName}</h2>
              <p><strong>Uer:</strong> {recipe.user}</p>
              <p><strong>Description:</strong> {recipe.description}</p>
              <p><strong>Disease:</strong> {recipe.disease}</p>
              {Array.isArray(recipe.ingradients) && recipe.ingradients.length > 0 && (
                <div className="mt-3">
                  <strong>Ingradients:</strong>
                  <ul className="list-disc list-inside ml-4">
                    {recipe.ingradients.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ✅ Steps */}
              {Array.isArray(recipe.steps) && recipe.steps.length > 0 && (
                <div className="mt-3">
                  <strong>Steps:</strong>
                  <ol className="list-decimal list-inside ml-4">
                    {recipe.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}

                <div className="flex gap-4 mt-4">
                  <button
                    className="flex bg-green-600 text-white px-4 py-2 rounded"
                    onClick={() => handleApprove(recipe._id)}
                  >
                    <FaCheckCircle className="mt-1 mr-1"/> Approve
                  </button>
                  <button
                    className="flex bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleReject(recipe._id)}
                  >
                    <FaTimesCircle className="mt-1 mr-1"/> Reject
                  </button>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;