"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image"; 
import { FiSearch } from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";
import { Loader2 } from "lucide-react";
import { tmdb } from "@/services/api";

const navItems = [
  { label: "All Reviews" },
  { label: "Trending" },
  { label: "Top Rated" },
  { label: "Coming Soon" },
];

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w92";

const MovieSidebar = ({ spotlightMovies, onSearch, onNavChange, activeNav }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside the sidebar search block
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced TMDB Lookup
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const delayDebounce = setTimeout(() => {
      setLoading(true);
      setShowDropdown(true);

      tmdb
        .get("/search/movie", {
          params: {
            api_key: process.env.NEXT_PUBLIC_API_KEY,
            query: query,
          },
        })
        .then((res) => {
          setResults(res.data.results?.slice(0, 5) || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
    setShowDropdown(false);
  };

  const handleSelectMovie = (movieTitle) => {
    setQuery(movieTitle);
    onSearch?.(movieTitle);
    setShowDropdown(false);
  };

  return (
    <aside className="w-full flex flex-col bg-black text-white h-screen sticky top-0 overflow-visible">
      {/* Search Container Area */}
      <div className="relative w-full z-50" ref={dropdownRef}>
        <form onSubmit={handleSubmit} className="flex items-stretch h-14 w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Movies..."
            className="flex-1 bg-[#f4f6f7] text-[#0c1f2c] placeholder:text-[#7c8a93] text-sm pl-6 pr-5 outline-none focus:outline-none focus:ring-2 focus:ring-[#f1b722]/50 transition-all font-medium"
          />
          <button
            type="submit"
            aria-label="Search"
            className="w-14 flex items-center justify-center bg-[#081b27] text-[#f1b722] hover:bg-[#0c2737] transition-colors shrink-0"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin text-[#f1b722]" />
            ) : (
              <FiSearch size={20} />
            )}
          </button>
        </form>

        {/* Floating Sidebar Dropdown Results */}
        {showDropdown && results.length > 0 && (
          <div className="absolute left-0 right-0 top-full bg-[#0c1f2c] border-b border-x border-slate-800 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="flex flex-col divide-y divide-slate-800/60 max-h-[320px] overflow-y-auto">
              {results.map((movie) => (
                <button
                  key={movie.id}
                  type="button"
                  onClick={() => handleSelectMovie(movie.title)}
                  className="flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#162436] transition-colors group w-full"
                >
                  {/* Thumbnail snippet */}
                  <div className="relative w-7 h-10 bg-black rounded overflow-hidden shrink-0">
                    {movie.poster_path ? (
                      <Image
                        src={IMG_BASE_URL + movie.poster_path}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="30px"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-900 flex items-center justify-center text-[8px]">
                        🎬
                      </div>
                    )}
                  </div>

                  {/* Movie labels */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white truncate group-hover:text-[#f1b722] transition-colors">
                      {movie.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
                      {movie.vote_average ? `  •  ★ ${movie.vote_average.toFixed(1)}` : ""}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Block */}
      <div className="mt-2">
        <h3 className="text-[#f1b722] font-bold text-lg px-5 pt-5 pb-3 tracking-wide">
          Navigate:
        </h3>
        <ul className="flex flex-col">
          {navItems.map(({ label }) => {
            const isActive = activeNav === label;
            return (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => onNavChange?.(label)}
                  className={`
                    w-full text-left px-5 py-4 text-[15px] font-semibold
                    flex items-center gap-3 transition-colors border-b border-white/5
                    ${isActive
                      ? "bg-[#f1b722] text-[#081b27]"
                      : "text-[#cdd8de] hover:bg-white/5"}
                  `}
                >
                  {!isActive && (
                    <IoChevronForward className="text-[#f1b722] text-sm shrink-0" />
                  )}
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Spotlight Movies Section */}
      <div className="mt-8 px-5 pb-6 overflow-y-auto flex-1 custom-scrollbar">
        <h3 className="text-slate-400 font-bold text-lg mb-4">In Spotlight today:</h3>
        
        <div className="flex flex-col gap-6">
          {spotlightMovies && spotlightMovies.length > 0 ? (
            spotlightMovies.slice(0,2).map((movie, idx) => (
              <div key={movie.id || idx} className="flex items-start gap-4 bg-black animate-fadeIn">
                <div className="relative w-16 aspect-[2/3] rounded overflow-hidden shrink-0 bg-[#0c1f2c]">
                  <div className="absolute top-1 left-1 z-10 bg-[#f1b722] text-[#081b27] text-[10px] font-extrabold px-1 py-0.5 rounded-full min-w-6 text-center shadow">
                    {movie.rating}
                  </div>
                  <Image
                    src={movie.image || "/images/placeholder-poster.png"}
                    alt={movie.title || "Movie poster"}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  <div className="flex gap-0.5 text-[#f1b722] text-lg">
                    {"★★★★★".split("").map((_, i) => {
                      const numericRating = Number(movie.rating) / 2 || 0;
                      return (
                        <span key={i} className={i < Math.round(numericRating) ? "opacity-100" : "opacity-30"}>★</span>
                      );
                    })}
                  </div>
                  <p className="text-white font-bold text-base leading-tight hover:text-[#f1b722] transition-colors cursor-pointer line-clamp-2">
                    {movie.title}
                  </p>
                </div>
              </div>
            ))
          ) : (
            [1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-16 aspect-[2/3] rounded bg-[#162436] animate-pulse shrink-0" />
                <div className="flex-1 flex flex-col gap-2 pt-2">
                  <div className="h-3 w-16 bg-[#162436] rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-[#162436] rounded animate-pulse" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
};

export default MovieSidebar;