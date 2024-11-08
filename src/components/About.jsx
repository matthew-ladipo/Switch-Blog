import React, { useState } from "react";
import abt from "../images/desktop-image-hero-1.jpg";

function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", formData);
    setFormSubmitted(true);
  };

  return (
    <>
      <div className="py-10">
        {/* Blog Title */}
        <div className="text-center py-10">
          <p className="text-6xl font-extrabold text-gray-100">
            SWITCH <span className="text-indigo-200">Blog</span>
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* About Section */}
          <div className="bg-white shadow-lg rounded-lg flex items-center overflow-hidden">
            <div className="w-1/2 hidden md:block">
              <img src={abt} alt="about-img" className="w-full h-full object-cover" />
            </div>
            <div className="p-8 w-full md:w-1/2">
              <h1 className="text-4xl font-semibold text-gray-800 mb-4">
                About SWITCH Blog
              </h1>
              <p className="text-gray-600 mb-4">
                Welcome to <span className="font-bold text-gray-800">SWITCH Blog</span>, your
                go-to platform for tech enthusiasts, developers, and learners.
                Our mission is to share insightful articles, tutorials, and
                experiences that help shape the tech community.
              </p>
              <p className="text-gray-600">
                Whether you're a seasoned developer or just starting your
                journey, our blog will keep you informed and inspired. Join us
                as we explore the latest trends in web development, software
                engineering, and more!
              </p>
            </div>
          </div>

          {/* Feedback Form Section */}
          <div className="bg-white shadow-xl rounded-lg mt-12 p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              We’d Love Your Feedback!
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Have any suggestions or feedback for us? Please fill out the form
              below. We appreciate your thoughts and strive to improve based on
              your input.
            </p>

            {formSubmitted ? (
              <div className="text-center text-green-600 font-bold text-xl">
                Thank you for your feedback!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Feedback
                  </label>
                  <textarea
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    rows="4"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-lg transition duration-200"
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
