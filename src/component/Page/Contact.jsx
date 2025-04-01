import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaEnvelope, FaUser, FaPaperPlane, FaCheckCircle, FaCommentDots } from "react-icons/fa";

const Contact = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-16 px-6 bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold text-orange-600 mb-6"> {showForm ? "Message Us" : "Contact Us"}</h1>

      {/* Toggle Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mt-6 flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition duration-300"
      >
        {showForm ? <FaPhone /> : <FaCommentDots />}
        {showForm ? "Contact Details" : "Message Us"}
      </button>

      <AnimatePresence mode="wait">
        {!showForm && (
          <motion.div
            key="contact-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mt-6 text-lg text-center leading-relaxed max-w-3xl"
          >
            <p className="mb-4">We’d love to hear from you! Contact us via phone or email.</p>

            <div className="mt-6 flex flex-col items-center gap-6">
              <div className="flex items-center gap-3 bg-white p-4 shadow-md rounded-lg w-80">
                <FaPhone className="text-orange-600 text-2xl" />
                <a href="tel:+918530849144" className="text-lg text-gray-700 hover:text-orange-600 transition">
                  +91 85308 49144
                </a>
              </div>

              <div className="flex items-center gap-3 bg-white p-4 shadow-md rounded-lg w-80">
                <FaEnvelope className="text-orange-600 text-2xl" />
                <a href="mailto:wbprasadjoshi@gmail.com" className="text-lg text-gray-700 hover:text-orange-600 transition">
                  wbprasadjoshi@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showForm && (
          <motion.div
            key="contact-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-white shadow-md rounded-lg p-6 w-full max-w-md"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Send Us a Message</h2>

            {/* Mailto Form */}
            <form action="mailto:pj160420@gmail.com" method="post" enctype="text/plain" className="space-y-4">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <FaUser className="text-gray-500" />
                <input type="text" name="name" placeholder="Your Name" className="w-full ml-3 outline-none bg-transparent" required />
              </div>

              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <FaEnvelope className="text-gray-500" />
                <input type="email" name="email" placeholder="Your Email" className="w-full ml-3 outline-none bg-transparent" required />
              </div>

              <div className="flex border border-gray-300 rounded-lg px-3 py-2">
                <textarea name="message" placeholder="Your Message" className="w-full outline-none bg-transparent resize-none h-24 p-1" required></textarea>
              </div>

              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition duration-300">
                <FaPaperPlane />
                Send Message
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
