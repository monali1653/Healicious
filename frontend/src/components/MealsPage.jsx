import React from "react";

const MealsPage = () => {
  return (
    <div className="w-full h-full">
      {/* Top Section */}
      <div className="bg-gradient-to-b from-blue-800 to-blue-400 h-[300px] flex flex-col justify-center items-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">
          GET YOUR PERSONALIZED MEALS
        </h1>
        <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-gray-100 transition">
          Start Now
        </button>
      </div>

      {/* Bottom Section */}
      <div className="bg-white py-10 px-6 md:px-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            LIVING HEALTHY
          </h2>
          <button className="text-blue-600 font-semibold hover:underline">
            View All
          </button>
        </div>
        <hr className="mb-8" />

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Card 1 */}
          <div className="relative rounded-lg shadow hover:shadow-md transition overflow-hidden">
            <img
              src="/images/diab.jpg"
              alt="Diabetes"
              className="w-full h-56 object-cover"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-2 text-center font-semibold">
              Diabetes
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative rounded-lg shadow hover:shadow-md transition overflow-hidden">
            <img
              src="/images/anae.jpg"
              alt="Anaemia"
              className="w-full h-56 object-cover"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-2 text-center font-semibold">
              Anaemia
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative rounded-lg shadow hover:shadow-md transition overflow-hidden">
            <img
              src="/images/hrtdis.jpg"
              alt="Heart Disease"
              className="w-full h-56 object-cover"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-2 text-center font-semibold">
              Heart Disease
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative rounded-lg shadow hover:shadow-md transition overflow-hidden">
            <img
              src="/images/kid.jpg"
              alt="Kidney Diseases"
              className="w-full h-56 object-cover"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-2 text-center font-semibold">
              Kidney Diseases
            </div>
          </div>

          {/* Card 5 */}
          <div className="relative rounded-lg shadow hover:shadow-md transition overflow-hidden">
            <img
              src="/images/obes.jpg"
              alt="Obesity"
              className="w-full h-56 object-cover"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-2 text-center font-semibold">
              Obesity
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsPage;
