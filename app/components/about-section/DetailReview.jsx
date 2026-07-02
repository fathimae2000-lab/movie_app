"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Roboto, Catamaran } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
});

const API_KEY = process.env.NEXT_PUBLIC_API_KEY; 
function DetailReview() {
  const [review, setReview] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        // Random movie
        const movieRes = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: { api_key: API_KEY },
          }
        );

        const movies = movieRes.data.results;
        const randomMovie =
          movies[Math.floor(Math.random() * movies.length)];

        // Reviews
        const reviewRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${randomMovie.id}/reviews`,
          {
            params: { api_key: API_KEY },
          }
        );

        if (reviewRes.data.results.length > 0) {
          setReview(reviewRes.data.results[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchReview();
  }, []);

  if (!review) {
    return (
      <div className="text-white text-center py-20">
        Loading review...
      </div>
    );
  }

  const avatar = review.author_details.avatar_path
    ? review.author_details.avatar_path.startsWith("/https")
      ? review.author_details.avatar_path.substring(1)
      : `https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`
    : `https://ui-avatars.com/api/?name=${review.author}`;

  return (
    <section
      className={`${roboto.className} relative h-[700px] flex items-center justify-center px-4 sm:px-6 py-16 overflow-hidden`}
      style={{
        backgroundImage: "url('/about-section-man.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/80 to-black/90" />

      <div className="relative z-20 max-w-6xl w-full flex flex-col md:flex-row items-center justify-around gap-10 text-white">

        <div className="text-center md:text-left max-w-xl">
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-200">
            "
            {review.content.length > 250
              ? review.content.slice(0, 250) + "..."
              : review.content}
            "
          </p>
        </div>

        <div className="flex flex-col items-center text-center gap-4">
          <img
            src={avatar}
            alt={review.author}
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-[#f1b722]"
          />

          <div>
            <h3
              className={`${catamaran.className} text-2xl font-bold`}
            >
              {review.author}
            </h3>

            <p
              className={`${catamaran.className} italic text-[#8d9eac]`}
            >
              ⭐ {review.author_details.rating || "N/A"} / 10
            </p>
          </div>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-b from-transparent via-[#06192b]/80 to-[#06192b]" />
    </section>
  );
}

export default DetailReview;