import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const fullText = "Not sure what to eat while keeping your health intact?";

  const images = [
    "/images/OatsUpma.jpg",
    "/images/grilled.avif",
    "/images/quinoa.jpg",
    "/images/avocado.jpg",
    "/images/spinach.webp",

  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Typewriter animation (smooth loop)
  useEffect(() => {
    let index = 0;
    let deleting = false;

    const interval = setInterval(() => {
      if (!deleting) {
        setText(fullText.slice(0, index + 1));
        index++;
        if (index === fullText.length) deleting = true;
      } else {
        setText(fullText.slice(0, index - 1));
        index--;
        if (index === 0) deleting = false;
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Image carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row w-full h-screen overflow-hidden bg-gradient-to-l from-pink-200 via-pink-100 to-pink-50">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-start w-full md:w-1/2 p-10 md:p-20 z-10 text-black">
        <h1 className="text-2xl md:text-4xl font-bold h-20">
          {text}
          <span className="animate-pulse text-black">|</span>
        </h1>
        <p className="text-black text-sm md:text-base mt-4">
          Find it right here on our website.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 bg-pink-500 hover:bg-pink-100 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
        >
          Login
        </button>
      </div>

      {/* Right Section */}
      <div className="relative flex justify-center items-center w-full md:w-1/2">
       

        {/* Food image circle */}
        <div className="relative z-10 flex justify-center items-center">
          <div className="w-56 h-56 md:w-120 md:h-120 rounded-full overflow-hidden shadow-xl border-4 border-red-950">
            <img
              src={images[currentImage]}
              alt="food"
              className="w-full h-full object-cover transition-all duration-700 ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
