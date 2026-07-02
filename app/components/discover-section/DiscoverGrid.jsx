"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import StarRating from "../StarRating";
import { useGenres } from "@/app/hooks/useGenre";
import { IMG_BASE_URL, IMG_HIGH_RES_URL } from "../../services/api";

function DiscoverGrid({ movies = [] }) {
  const genreMap = useGenres();

  // Constrain incoming movies array to exactly 7 items max
  const displayedMovies = movies.slice(0, 7);

  // Layout logic configuration matching your 1:3 -> 1:1:1 -> 3:1 pattern structure
  const getColSpanClass = (index) => {
    if (index === 0) return "sm:col-span-9 col-span-12 h-[450px]"; // Row 1, Wide
    if (index === 1) return "sm:col-span-3 col-span-12 h-[450px]"; // Row 1, Narrow
    if (index >= 2 && index <= 4) return "sm:col-span-4 col-span-12 h-[380px]"; // Row 2, Equal
    if (index === 5) return "sm:col-span-3 col-span-12 h-[450px]"; // Row 3, Narrow
    if (index === 6) return "sm:col-span-9 col-span-12 h-[450px]"; // Row 3, Wide
    return "sm:col-span-4 col-span-12";
  };

  return (
    <div className="grid grid-cols-12 gap-0.5 bg-[#162436] w-full m-0 p-0">
      {displayedMovies.map((movie, index) => {
        const genres = movie.genre_ids?.slice(0, 1).map((id) => genreMap[id]).filter(Boolean) || [];
        const layoutClass = getColSpanClass(index);

        // Dynamically select high resolution images for large layout items to eliminate blurriness
        const isWideCard = index === 0 || index === 6;
        const currentImgBase = isWideCard ? IMG_HIGH_RES_URL : IMG_BASE_URL;

        return (
          <Link
            href={`/movies/${movie.id}`}
            key={movie.id}
            className={`block relative w-full overflow-hidden group cursor-pointer ${layoutClass}`}
          >
            {/* Poster Image */}
            {movie.poster_path ? (
              <Image
                src={currentImgBase + movie.poster_path}
                alt={movie.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes={isWideCard ? "100vw" : "(max-width: 1024px) 50vw, 33vw"}
                priority={index < 2} // Optimization: preloads the first visible items instantly
              />
            ) : (
              <div className="absolute inset-0 bg-[#162436]" />
            )}

            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300" />

            {/* Rating Badge */}
            <div className="absolute top-4 right-4 z-10 w-9 h-9 bg-[#f5b50a] rounded-full flex items-center justify-center shadow-md">
              <span className="text-[#081b27] text-xs font-bold">
                {movie.vote_average ? movie.vote_average.toFixed(1).replace('.', ',') : "0,0"}
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              {/* Title */}
              <h3 className="text-white font-bold text-xl md:text-2xl leading-tight mb-2 tracking-wide drop-shadow-md">
                {movie.title}
              </h3>

              {/* Meta row */}
              <div className="flex items-center gap-3">
                <StarRating rating={movie.vote_average / 2} max={5} size={14} interactive={false} />
                
                {genres[0] && (
                  <div className="flex items-center gap-1.5 opacity-80">
                    <svg className="w-3.5 h-3.5 text-[#f5b50a]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
                    </svg>
                    <span className="text-gray-300 text-xs font-medium">{genres[0]}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default DiscoverGrid;