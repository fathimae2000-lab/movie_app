import React from 'react'
import { Catamaran } from "next/font/google";
import {FaFacebook, FaTwitter, FaInstagram} from "react-icons/fa";


const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

 const Footer = () => {
  return (
    <footer
      className={`${catamaran.className} relative z-10 text-white px-6 flex items-center justify-center md:pt-40 py-10`}
      style={{
        backgroundImage: "url('/footerImg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* 🔥 Top Blur (merge with previous section) */}
         <div className="absolute top-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-b from-[#081b27] to-transparent z-10"></div>


      {/* 🔥 Dark Overlay */}
      <div className="absolute inset-0 bg-[#081b27]/80"></div>

      {/* 🔥 Content */}
      <div className="relative z-30 max-w-6xl mx-auto">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-30 text-center md:text-left">

          {/* Information */}
          <div>
            <p className="text-xl font-semibold mb-5 tracking-wide">
              Information
            </p>
            <ul className="space-y-3 text-md text-[#899ead]">
              <li className="hover:text-yellow-400 cursor-pointer transition">
                Image Licenses
              </li>
              <li className="hover:text-yellow-400 cursor-pointer transition">
                Contact Us
              </li>
              <li className="hover:text-yellow-400 cursor-pointer transition">
                Our Authors
              </li>
            </ul>
          </div>

          {/* Discover */}
          <div>
            <p className="text-xl font-semibold mb-5 tracking-wide">
              Discover
            </p>
            <ul className="space-y-3 text-md text-[#899ead]">
              <li className="hover:text-yellow-400 cursor-pointer transition">
                All Reviews
              </li>
              <li className="hover:text-yellow-400 cursor-pointer transition">
                Author Picks
              </li>
              <li className="hover:text-yellow-400 cursor-pointer transition">
                New Releases
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <p className="text-xl font-semibold mb-5 tracking-wide">
              Community
            </p>

            <div className="space-y-4 text-md text-[#899ead]">
              
              <div className="flex items-center justify-center md:justify-start gap-3 hover:text-yellow-400 cursor-pointer transition">
                <FaFacebook />
                <span>Facebook</span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3 hover:text-yellow-400 cursor-pointer transition">
                <FaTwitter />
                <span>Twitter</span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3 hover:text-yellow-400 cursor-pointer transition">
                <FaInstagram />
                <span>Instagram</span>
              </div>

            </div>
          </div>

        </div>
        {/* Bottom */}
        <div className="border-t border-gray-600 mt-12 pt-6 text-center text-sm text-gray-400">
          <p>Copyright © 2024 Book Review. All rights reserved.</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer