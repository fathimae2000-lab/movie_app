"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function GenreFilterGrid({ onGenreSelect }) {
  const router = useRouter();
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 18, name: "Drama" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 53, name: "Thriller" },
    { id: 37, name: "Western" },
    { id: 16, name: "Animation" },
    { id: 99, name: "Documentary" },
    { id: 10751, name: "Family" },
  ];

  const handleSelect = (genre) => {
    const nextSelected = selectedGenreId === genre.id ? null : genre.id;
    setSelectedGenreId(nextSelected);
    onGenreSelect?.(nextSelected);

    const slug = genre.name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/category/${slug}?id=${genre.id}`);
  };

  return (
    <div className="w-full bg-[#081b27] py-12 px-6 md:px-16 border-t border-gray-800/20 md:pt-20">
      <div>
        <h2 className="text-white text-3xl md:text-8xl font-extrabold leading-tight text-center">
          Discover
        </h2>
        <p className="text-slate-400 mt-3 font-light text-sm md:text-2xl text-center">
          Discover our reviews by movie genre:
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 pt-15">
        {genres.map((genre) => {
          const isSelected = selectedGenreId === genre.id;

          return (
            <button
              key={`${genre.id}-${genre.name}`}
              onClick={() => handleSelect(genre)}  // ✅ full genre object pass ചെയ്യുന്നു
              className={`flex items-center gap-3 w-full px-5 py-4 rounded-sm border text-left font-medium transition-all duration-200 group text-sm md:text-base
                ${
                  isSelected
                    ? "bg-[#182a3c]/70 border-[#2b425a] text-gray-100 shadow-md"
                    : "bg-[#0b1722]/60 border-[#122232] text-gray-400 hover:border-[#1d334a] hover:text-gray-200"
                }
              `}
            >
              <div className="flex items-center justify-center w-5 h-5">
                <svg
                  className={`w-4 h-4 transition-colors duration-200 ${
                    isSelected ? "text-[#f5b50a]" : "text-gray-500/70 group-hover:text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="tracking-wide">{genre.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GenreFilterGrid;