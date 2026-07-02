"use client";

import Image from "next/image";
import StarRating from "../StarRating";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function Top100List({ movies, loading, genreMap }) {
  if (loading) {
    return (
      <div className="pt-24 md:pt-28 px-6 md:px-10 pb-20">
        <div className="mb-10">
          <h2 className="text-white text-5xl md:text-7xl font-extrabold leading-tight">Top 100</h2>
          <p className="text-gray-400 text-sm mt-2">Our Movie Reviews Top 100 List.</p>
        </div>
        {[1,2,3,4,5].map((i) => (
          <div key={i} className="flex gap-4 py-5 border-b border-white/5 animate-pulse">
            <div className="w-16 aspect-[2/3] rounded bg-[#0c1f2c] shrink-0" />
            <div className="flex-1 flex flex-col gap-2 justify-center">
              <div className="h-4 w-1/3 bg-[#0c1f2c] rounded" />
              <div className="h-3 w-1/4 bg-[#0c1f2c] rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28 px-6 md:px-10 pb-20">
      <div className="mb-10">
        <h2 className="text-white text-5xl md:text-7xl font-extrabold leading-tight">Top 100</h2>
        <p className="text-gray-400 text-sm mt-2">Our Movie Reviews Top 100 List.</p>
      </div>

      <div className="border-t border-white/10">
        {movies.slice(0, 100).map((movie, index) => {
          const genres = movie.genre_ids?.slice(0, 2).map((id) => genreMap[id]).filter(Boolean) || [];
          return (
            <div
              key={movie.id}
              className="flex items-center gap-5 py-5 border-b border-white/5 group hover:bg-white/[0.03] transition-colors px-2 rounded"
            >
              {/* Poster */}
              <div className="relative w-16 aspect-[2/3] rounded overflow-hidden shrink-0 bg-[#0c1f2c]">
                {/* Rating badge */}
                <div className="absolute top-1 left-1 z-10 bg-[#f1b722] text-[#081b27] text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow">
                  {movie.vote_average?.toFixed(1)}
                </div>
                {movie.poster_path ? (
                  <Image
                    src={IMG_BASE_URL + movie.poster_path}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-500 text-center px-1">
                    No poster
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <StarRating size="text-sm" rating={movie.vote_average / 2} />
                </div>
                <p className="text-white font-bold text-base leading-tight truncate">
                  {movie.title}
                </p>
                {genres.length > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[#f1b722] text-xs">🏷</span>
                    {genres.map((g, i) => (
                      <span key={g} className="text-[#f1b722] text-xs underline underline-offset-2">
                        {g}{i < genres.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* View More button */}
              <button className="shrink-0 px-5 py-2.5 border border-white/30 text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#081b27] transition-all duration-200">
                View More
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}