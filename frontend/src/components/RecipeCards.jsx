import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Clock, Eye } from "lucide-react";
import axios from "axios";

const RecipeCards = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/recipes/${category}`
        );
        setRecipes(res.data);
      } catch (err) {
        console.error(err);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    if (category) fetchRecipes();
  }, [category]);

  const handleView = (recipe) => {
  navigate(`/disease/${recipe.disease}/${recipe.name}`);
};


  return (
    <div className="px-6 py-24 bg-yellow-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-10 text-center capitalize">
        {category ? `${category} Recipes` : "Recipes"}
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading...</p>
      ) : recipes.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No recipes found for this category.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-10">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-72 pt-16 pb-8 px-4 text-center"
            >
              <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                <img
                  src={recipe.img}
                  alt={recipe.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-yellow-300 shadow-lg"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-6">
                {recipe.name}
              </h3>

              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center text-gray-700">
                  <Clock size={22} className="text-yellow-500 mb-1" />
                  <p className="text-sm">total time</p>
                  <p className="font-semibold text-gray-900">{recipe.time}</p>
                </div>

                <div className="w-10 h-px bg-gray-300"></div>

                <button
  onClick={() => handleView(recipe)}
  className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-all duration-300"
>
  <Eye size={18} />
  View Now
</button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeCards;







// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Clock, Eye } from "lucide-react";
// import axios from "axios";

// const RecipeCards = () => {
//   const navigate = useNavigate();
//   const { category } = useParams();
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `http://localhost:5000/api/recipes/${category}`
//         );
//         setRecipes(res.data);
//       } catch (err) {
//         console.error(err);
//         setRecipes([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (category) fetchRecipes();
//   }, [category]);

//   const handleView = (recipe) => {
//   navigate(`/disease/${recipe.disease}/${recipe.name}`);
// };


//   return (
//     <div className="px-6 py-24 bg-yellow-50 min-h-screen">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-10 text-center capitalize">
//         {category ? `${category} Recipes` : "Recipes"}
//       </h2>

//       {loading ? (
//         <p className="text-center text-gray-500 text-lg">Loading...</p>
//       ) : recipes.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg">
//           No recipes found for this category.
//         </p>
//       ) : (
//         <div className="flex flex-wrap justify-center gap-10">
//           {recipes.map((recipe) => (
//             <div
//               key={recipe._id}
//               className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-72 pt-16 pb-8 px-4 text-center"
//             >
//               <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
//                 <img
//                   src={recipe.img}
//                   alt={recipe.name}
//                   className="w-28 h-28 rounded-full object-cover border-4 border-yellow-300 shadow-lg"
//                 />
//               </div>

//               <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-6">
//                 {recipe.name}
//               </h3>

//               <div className="flex flex-col items-center gap-4">
//                 <div className="flex flex-col items-center text-gray-700">
//                   <Clock size={22} className="text-yellow-500 mb-1" />
//                   <p className="text-sm">total time</p>
//                   <p className="font-semibold text-gray-900">{recipe.time}</p>
//                 </div>

//                 <div className="w-10 h-px bg-gray-300"></div>

//                 <button
//   onClick={() => handleView(recipe)}
//   className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-all duration-300"
// >
//   <Eye size={18} />
//   View Now
// </button>

//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeCards;






// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Clock, Eye, MessageSquare } from "lucide-react";
// import axios from "axios";

// // Known diseases
// const diseases = [
//   { name: "All Types" },
//   { name: "Diabetes" },
//   { name: "Anaemia" },
//   { name: "Thyroid" },
//   { name: "Obesity" },
//   { name: "PCOS" },
//   { name: "Heart Health" },
// ];

// const extraDiseases = [
//   { name: "Hypertension" },
//   { name: "Cholesterol" },
//   { name: "Liver Health" },
//   { name: "Kidney Health" },
//   { name: "Digestive Health" },
//   { name: "Joint Pain" },
//   { name: "Migraine Relief" },
//   { name: "Lactose Intolerance" },
//   { name: "Gluten Intolerance" },
//   { name: "Arthritis" },
//   { name: "Depression & Anxiety" },
//   { name: "Asthma" },
//   { name: "Menopause Support" },
//   { name: "Pregnancy Nutrition" },
//   { name: "Postpartum Recovery" },
//   { name: "Immunity Boost" },
//   { name: "Fatty Liver" },
//   { name: "Skin Health" },
//   { name: "Bone Strength" },
//   { name: "Eye Health" },
//   { name: "Sleep Improvement" },
//   { name: "Allergy-Friendly" },
//   { name: "Cancer Recovery" },
//   { name: "Detox & Cleanse" },
// ];

// const RecipeCards = () => {
//   const navigate = useNavigate();
//   const { category } = useParams();
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Combine both arrays for validation
//   const allDiseases = [...diseases, ...extraDiseases];
//   const knownDiseaseNames = allDiseases.map((d) => d.name.toLowerCase());

//   const isKnownDisease = category
//     ? knownDiseaseNames.includes(category.toLowerCase())
//     : false;

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `http://localhost:5000/api/recipes/${category}`
//         );
//         setRecipes(res.data);
//       } catch (err) {
//         console.error(err);
//         setRecipes([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (category) fetchRecipes();
//   }, [category]);

//   const handleView = (recipe) => {
//     navigate(`/disease/${recipe.disease}/${recipe.name}`);
//   };

//   const handleAskAI = () => {
//     navigate(`/ask-ai?query=${encodeURIComponent(category)}`);
//   };

//   return (
//     <div className="px-6 py-24 bg-yellow-50 min-h-screen">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-10 text-center capitalize">
//         {category ? `${category} Recipes` : "Recipes"}
//       </h2>

//       {loading ? (
//         <p className="text-center text-gray-500 text-lg">Loading...</p>
//       ) : recipes.length === 0 ? (
//         <div className="flex flex-col items-center justify-center gap-4">
//           <p className="text-center text-gray-500 text-lg">
//             No recipes found for this category.
//           </p>

//           {/* 🧠 Ask AI button (only for unknown diseases) */}
//           {!isKnownDisease && (
//             <button
//               onClick={handleAskAI}
//               className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-3 rounded-full shadow-md transition-all duration-300"
//             >
//               <MessageSquare size={20} />
//               Ask AI about "{category}"
//             </button>
//           )}
//         </div>
//       ) : (
//         <div className="flex flex-wrap justify-center gap-10">
//           {recipes.map((recipe) => (
//             <div
//               key={recipe._id}
//               className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-72 pt-16 pb-8 px-4 text-center"
//             >
//               <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
//                 <img
//                   src={recipe.img}
//                   alt={recipe.name}
//                   className="w-28 h-28 rounded-full object-cover border-4 border-yellow-300 shadow-lg"
//                 />
//               </div>

//               <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-6">
//                 {recipe.name}
//               </h3>

//               <div className="flex flex-col items-center gap-4">
//                 <div className="flex flex-col items-center text-gray-700">
//                   <Clock size={22} className="text-yellow-500 mb-1" />
//                   <p className="text-sm">total time</p>
//                   <p className="font-semibold text-gray-900">{recipe.time}</p>
//                 </div>

//                 <div className="w-10 h-px bg-gray-300"></div>

//                 <button
//                   onClick={() => handleView(recipe)}
//                   className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-all duration-300"
//                 >
//                   <Eye size={18} />
//                   View Now
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeCards;
