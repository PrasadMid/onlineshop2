import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gray-100 text-gray-900">
      
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-6">
        About Us
      </h1>

      {/* Content Section */}
      <div className="max-w-3xl text-lg text-center leading-relaxed">
        <p className="mb-4">
          Welcome to <strong>our website</strong>. We are a passionate team dedicated to providing high-quality product and innovative solutions.
        </p>
        <p className="mb-4">
          Our journey started with a vision to revolutionize the industry by offering cutting-edge technology and exceptional customer experiences.
        </p>
        <p className="mb-4">
          With a team of skilled professionals, we ensure that our solutions meet the highest standards, making a positive impact on businesses and individuals alike.
        </p>
      </div>

      {/* Team Section */}
      <div className="mt-10 flex flex-wrap justify-center gap-8">
        <div className="w-60 p-4 bg-white shadow-md rounded-lg text-center">
        
          <h3 className="text-xl font-semibold">Prasad Joshi</h3>
          <p className="text-gray-500">Founder & CEO</p>
        </div>
        
      </div>

    </div>
  );
};

export default About;
