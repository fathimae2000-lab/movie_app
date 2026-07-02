"use client";

import React, { useState } from "react";
import { Catamaran } from "next/font/google";

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Form input validation logic
    if (!formData.firstname || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    try {
      // Replace this mock delay with your real route handling url (e.g., api/contact)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted successfully:", formData);
      setStatus("success");
      
      // Clear forms out upon success
      setFormData({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div
      className={`${catamaran.className} relative min-h-screen flex items-center px-6 md:px-24 lg:px-44 py-16 overflow-x-hidden`}
      style={{
        backgroundImage: "url('/contact img.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-950/60"></div>

      {/* Content wrapper */}
      <div className="relative z-10 text-white w-full max-w-4xl pt-20">
        
        {/* Heading */}
        <div className="mb-10 mt-10 space-y-2">
          <span className="block text-xl ms-2 font-semibold tracking-widest uppercase text-[#f1b722]">
            Just Say Hey!
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-bold leading-none">
            Send us
          </h1>
          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-bold leading-none">
            an Email
          </h1>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
          
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div className="form-group">
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="Your first name"
                disabled={status === "submitting"}
                className="w-full bg-transparent border-b-2 border-zinc-500/50 text-[#cbd5e1] placeholder-white/60 py-3 px-0 text-xl md:text-[24px] outline-none transition-all duration-300 focus:placeholder-transparent hover:border-[#f1b722] focus:border-[#f1b722] disabled:opacity-40"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Your last name"
                disabled={status === "submitting"}
                className="w-full bg-transparent border-b-2 border-zinc-500/50 text-[#cbd5e1] placeholder-white/60 py-3 px-0 text-xl md:text-[24px] outline-none transition-all duration-300 focus:placeholder-transparent hover:border-[#f1b722] focus:border-[#f1b722] disabled:opacity-40"
              />
            </div>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                disabled={status === "submitting"}
                className="w-full bg-transparent border-b-2 border-zinc-500/50 text-[#cbd5e1] placeholder-white/60 py-3 px-0 text-xl md:text-[24px] outline-none transition-all duration-300 focus:placeholder-transparent hover:border-[#f1b722] focus:border-[#f1b722] disabled:opacity-40"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled={status === "submitting"}
                className="w-full bg-transparent border-b-2 border-zinc-500/50 text-[#cbd5e1] placeholder-white/60 py-3 px-0 text-xl md:text-[24px] outline-none transition-all duration-300 focus:placeholder-transparent hover:border-[#f1b722] focus:border-[#f1b722] disabled:opacity-40"
              />
            </div>
          </div>

          {/* Message */}
          <div className="form-group">
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows={3}
              disabled={status === "submitting"}
              className="w-full bg-transparent border-b-2 border-zinc-500/50 text-[#cbd5e1] placeholder-white/60 py-3 px-0 text-xl md:text-[24px] outline-none resize-none transition-all duration-300 focus:placeholder-transparent hover:border-[#f1b722] focus:border-[#f1b722] disabled:opacity-40"
            />
          </div>

          {/* Dynamic Action Alerts */}
          {status === "success" && (
            <p className="text-emerald-400 font-medium text-base animate-pulse">
              ✓ Email sent successfully! We'll look at your review submission shortly.
            </p>
          )}
          {status === "error" && (
            <p className="text-rose-400 font-medium text-base">
              ⚠️ Please fill out all required fields (First name, Email, and Message).
            </p>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="bg-[#f1b722] text-zinc-950 font-bold tracking-widest uppercase py-4 px-10 text-sm transition-all duration-300 hover:bg-white hover:text-black active:scale-95 disabled:bg-zinc-600 disabled:text-zinc-400 disabled:scale-100 disabled:cursor-not-allowed shadow-xl"
            >
              {status === "submitting" ? "Sending..." : "Send Email"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ContactPage;