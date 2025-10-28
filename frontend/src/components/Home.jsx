import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaStar,
  FaUtensils,
  FaAppleAlt,
  FaHeartbeat,
  FaTint,
  FaWeight,
  FaLemon,
  FaLeaf,
  FaChevronRight,
  FaChevronUp,
} from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const wellbeingRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

  const diseases = [
    { name: "All Types", icon: <FaAppleAlt />, path: "/disease/all", active: true },
    { name: "Diabetes", icon: <FaHeartbeat />, path: "/disease/diabetes" },
    { name: "Anaemia", icon: <FaTint />, path: "/disease/anaemia" },
    { name: "Thyroid", icon: <FaLeaf />, path: "/disease/thyroid" },
    { name: "Obesity", icon: <FaWeight />, path: "/disease/obesity" },
    { name: "PCOS", icon: <FaLemon />, path: "/disease/pcos" },
    { name: "Heart Health", icon: <FaHeartbeat />, path: "/disease/heart-health" },
  ];

const extraDiseases = [
  { name: "Hypertension", icon: <FaHeartbeat />, path: "/disease/hypertension" },
  { name: "Cholesterol", icon: <FaLeaf />, path: "/disease/cholesterol" },
  { name: "Liver Health", icon: <FaAppleAlt />, path: "/disease/liver" },
  { name: "Kidney Health", icon: <FaTint />, path: "/disease/kidney" },
  { name: "Digestive Health", icon: <FaUtensils />, path: "/disease/digestive" },
  { name: "Joint Pain", icon: <FaStar />, path: "/disease/joint-pain" },
  { name: "Migraine Relief", icon: <FaLemon />, path: "/disease/migraine" },
  { name: "Lactose Intolerance", icon: <FaAppleAlt />, path: "/disease/lactose" },
  { name: "Gluten Intolerance", icon: <FaLeaf />, path: "/disease/gluten" },
  { name: "Arthritis", icon: <FaHeartbeat />, path: "/disease/arthritis" },
  { name: "Depression & Anxiety", icon: <FaStar />, path: "/disease/depression" },
  { name: "Asthma", icon: <FaTint />, path: "/disease/asthma" },
  { name: "Menopause Support", icon: <FaLeaf />, path: "/disease/menopause" },
  { name: "Pregnancy Nutrition", icon: <FaAppleAlt />, path: "/disease/pregnancy" },
  { name: "Postpartum Recovery", icon: <FaUtensils />, path: "/disease/postpartum" },
  { name: "Immunity Boost", icon: <FaLemon />, path: "/disease/immunity" },
  { name: "Fatty Liver", icon: <FaTint />, path: "/disease/fatty-liver" },
  { name: "Skin Health", icon: <FaLeaf />, path: "/disease/skin-health" },
  { name: "Bone Strength", icon: <FaWeight />, path: "/disease/bone-health" },
  { name: "Eye Health", icon: <FaAppleAlt />, path: "/disease/eye-health" },
  { name: "Sleep Improvement", icon: <FaStar />, path: "/disease/sleep" },
  { name: "Allergy-Friendly", icon: <FaLemon />, path: "/disease/allergy" },
  { name: "Cancer Recovery", icon: <FaHeartbeat />, path: "/disease/cancer" },
  { name: "Detox & Cleanse", icon: <FaLeaf />, path: "/disease/detox" },
];


  const handleExploreClick = () => {
    wellbeingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col scroll-smooth">
      {/* ================= HERO SECTION ================= */}
      <div className="flex flex-col md:flex-row items-center justify-between min-h-screen bg-white px-6 md:px-0 py-10 overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 text-center md:text-left z-10 px-6 md:px-16">
          <p className="text-yellow-500 font-medium text-sm md:text-base">
            Keep yourself healthy!
          </p>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
            Enjoy Your{" "}
            <span className="text-yellow-500">Special</span> Delicious Healthy Meal{" "}
            <span className="inline-block animate-bounce">🔥</span>
          </h1>

          <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto md:mx-0">
            We make it easy for you to keep your health perfect without compromising with taste.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
            <button
              onClick={handleExploreClick}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-300"
            >
              Explore Now
            </button>
           
          </div>

          {/* Stats Section */}
          <div className="flex flex-col sm:flex-row gap-6 mt-10 justify-center md:justify-start">
            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4 shadow-sm w-32">
              <FaStar className="text-yellow-500 text-2xl mb-1" />
              <p className="font-semibold text-gray-800">(4.8)</p>
              <p className="text-xs text-gray-500">15K Reviews</p>
            </div>

            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4 shadow-sm w-32">
              <FaUtensils className="text-yellow-500 text-2xl mb-1" />
              <p className="font-semibold text-gray-800">400+</p>
              <p className="text-xs text-gray-500">Comments</p>
            </div>

            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4 shadow-sm w-32">
              <FaAppleAlt className="text-yellow-500 text-2xl mb-1" />
              <p className="font-semibold text-gray-800">700+</p>
              <p className="text-xs text-gray-500">Food Items</p>
            </div>
          </div>
        </div>

        {/* Right Section with angled cut */}
        <div className="relative w-full md:w-1/2 h-80 md:h-screen mt-10 md:mt-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/food-banner.jpg')",
              clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          ></div>
          <div className="absolute inset-0 bg-white opacity-5"></div>
        </div>
      </div>

      {/* ================= WELLBEING SECTION ================= */}
      <section
        ref={wellbeingRef}
        className="bg-white py-16 px-6 md:px-20 text-center scroll-mt-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-4">
          Your Wellbeing is Our Priority
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          We believe food can be healing. Our disease-specific healthy meals are designed to support your body’s needs while keeping the comfort of homemade taste in every bite.
        </p>

        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Left Column */}
          <div className="flex flex-col gap-10">
            {/* Save Time */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/images/save-time.jpg"
                alt="Save Time"
                className="w-20 h-20 object-cover rounded-full mb-3 shadow-md"
              />
              <h3 className="text-lg font-semibold text-yellow-600 mb-2">Save Time</h3>
              <p className="text-gray-600 text-sm md:text-base max-w-xs mx-auto">
                No need to spend hours planning or cooking. Get freshly prepared, home-style meals made with the right ingredients for your health goals — ready to eat when you are.
              </p>
            </div>

            {/* Save Money */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/images/save-money.jpg"
                alt="Save Money"
                className="w-20 h-20 object-cover rounded-full mb-3 shadow-md"
              />
              <h3 className="text-lg font-semibold text-yellow-600 mb-2">Save Money</h3>
              <p className="text-gray-600 text-sm md:text-base max-w-xs mx-auto">
                Healthy eating doesn’t have to be costly. Our balanced, nutrition-focused meals give you wholesome food at an affordable price.
              </p>
            </div>
          </div>

          {/* Center Image */}
          <div className="flex justify-center">
            <img
              src="/images/center.jpg"
              alt="Meal Kit"
              className="w-full max-w-sm rounded-2xl shadow-md object-cover"
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-10">
            {/* Food Quality */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/images/food-quality.jpg"
                alt="Restaurant Quality"
                className="w-20 h-20 object-cover rounded-full mb-3 shadow-md"
              />
              <h3 className="text-lg font-semibold text-yellow-600 mb-2">Food Quality</h3>
              <p className="text-gray-600 text-sm md:text-base max-w-xs mx-auto">
                Enjoy food that’s both nourishing and satisfying — perfectly cooked, full of flavor, and made just like home.
              </p>
            </div>

            {/* Reduce Waste */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/images/reduce-waste.jpg"
                alt="Reduce Waste"
                className="w-20 h-20 object-cover rounded-full mb-3 shadow-md"
              />
              <h3 className="text-lg font-semibold text-yellow-600 mb-2">Reduce Waste</h3>
              <p className="text-gray-600 text-sm md:text-base max-w-xs mx-auto">
                Every meal is portioned mindfully to match your diet plan. You get exactly what your body needs — nothing extra, nothing wasted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DISEASE SECTION ================= */}
      <section className="bg-white py-16 px-6 md:px-20 border-t border-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Find your <span className="text-yellow-500">disease specific</span> meals
        </h2>

        {/* Disease Buttons */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {diseases.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full shadow-sm border transition-all duration-300
                ${
                  item.active
                    ? "bg-black text-white border-black"
                    : "bg-gray-50 hover:bg-yellow-50 text-gray-700 border-gray-200"
                }`}
            >
              <span className="text-yellow-500 text-lg">{item.icon}</span>
              <span className="font-medium text-sm md:text-base">{item.name}</span>
            </button>
          ))}

          {showMore &&
            extraDiseases.map((item, index) => (
              <button
                key={`extra-${index}`}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full shadow-sm border bg-gray-50 hover:bg-yellow-50 text-gray-700 border-gray-200 transition-all duration-300"
              >
                <span className="text-yellow-500 text-lg">{item.icon}</span>
                <span className="font-medium text-sm md:text-base">{item.name}</span>
              </button>
            ))}
        </div>

        {/* See More / See Less Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center text-yellow-600 hover:text-yellow-700 font-medium transition duration-200"
          >
            {showMore ? (
              <>
                See Less <FaChevronUp className="ml-1" />
              </>
            ) : (
              <>
                See More <FaChevronRight className="ml-1" />
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
