"use client";

import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { tmdb } from "@/services/api";
import Link from "next/link";
import Image from "next/image";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w92";

export default function SearchReview() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Debounce: Wait 300ms after the user stops typing to fire the API call
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      setLoading(true);

      tmdb
        .get("/search/movie", {
          params: {
            api_key: process.env.NEXT_PUBLIC_API_KEY,
            query: query,
          },
        })
        .then((res) => {
          // Grab top 5 search matches
          setResults(res.data.results?.slice(0, 5) || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <section className="w-full bg-[#081b27] py-8 px-6 relative z-30">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <p className="text-yellow-500 text-lg md:text-xl mb-6 font-medium">
          Looking for something else? Search our reviews:
        </p>

        {/* Search Bar Container */}
        <div className="relative max-w-xl mx-auto w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Try "The Lord of the Rings"'
            className="w-full h-14 rounded-full bg-white pl-12 pr-14 text-slate-800 text-base md:text-lg outline-none focus:outline-none focus:ring-4 focus:ring-yellow-500/40 transition-all shadow-xl placeholder:ml-2"
          />
          {/* Icon/Loader Dynamic Button */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-500">
            {loading ? (
              <Loader2 size={22} className="animate-spin text-amber-500" />
            ) : (
              <Search size={22} />
            )}
          </div>

          {/* Floating Dropdown Results Menu */}
          {results.length > 0 && (
            <div className="absolute left-0 right-0 mt-3 bg-[#162436] border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl text-left z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="py-2 max-h-[380px] overflow-y-auto split-y divide-y divide-slate-700/40">
                {results.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movies/${movie.id}`}
                    onClick={() => setQuery("")} // Clear field on selection
                    className="flex items-center gap-4 px-4 py-3 hover:bg-[#1e3148] transition-colors group"
                  >
                    {/* Tiny Thumbnail */}
                    <div className="relative w-9 h-14 bg-[#081b27] rounded overflow-hidden flex-shrink-0">
                      {movie.poster_path ? (
                        <Image
                          src={IMG_BASE_URL + movie.poster_path}
                          alt={movie.title}
                          fill
                          className="object-cover"
                          sizes="36px"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-500">
                          🎬
                        </div>
                      )}
                    </div>

                    {/* Movie Text Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate group-hover:text-yellow-400 transition-colors">
                        {movie.title}
                      </p>
                      <p className="text-slate-400 text-xs mt-0.5">
                        {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
                        {movie.vote_average ? `  •  ★ ${movie.vote_average.toFixed(1)}` : ""}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}