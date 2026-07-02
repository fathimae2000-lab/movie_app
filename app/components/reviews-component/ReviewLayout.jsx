"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { tmdb } from "@/services/api";
import StarRating from "../StarRating";
import GenreTag from "../GenreTag";
import { useGenres } from "@/app/hooks/useGenre";
import MovieSidebar from './MovieSidebar';
import Link from "next/link";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
const MOVIES_PER_PAGE = 8;

const NAV_ENDPOINTS = {
  "All Reviews": "/movie/popular",
  "Trending": "/trending/movie/week",
  "Top Rated": "/movie/top_rated",
  "Coming Soon": "/movie/upcoming",
};

export default function ReviewLayout() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const [activeNav, setActiveNav] = useState("All Reviews");

  const genreMap = useGenres();

  useEffect(() => {
    setLoading(true);
    setError("");
    setCurrentPage(1);

    const controller = new AbortController();
    
    const endpoint = query ? "/search/movie" : (NAV_ENDPOINTS[activeNav] || "/movie/popular");
    const params = query ? { query } : {};

    tmdb
      .get(endpoint, { params, signal: controller.signal })
      .then((res) => {
        const results = res.data.results || [];
        setMovies(results);
        setLoading(false);

        if (query && results.length === 0) {
          setError(`No results for "${query}".`);
        }
      })
      .catch((err) => {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [query, activeNav])

  const indexOfLastMovie = currentPage * MOVIES_PER_PAGE;
  const indexOfFirstMovie = indexOfLastMovie - MOVIES_PER_PAGE;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);

  const getSubtitle = () => {
    if (activeNav === "Trending") return "The most watched movies this week.";
    if (activeNav === "Top Rated") return "Highest rated movies of all time.";
    if (activeNav === "Coming Soon") return "Anticipated movies arriving shortly.";
    return "All our reviews sorted alphabetically.";
  };

  return (
    <div className="pt-20 bg-[#081b27] min-h-screen">
      <div className="flex flex-col md:flex-row min-h-screen">

        {/* Left Area: Title Header + Movie Grid Container Section */}
        <div className="flex-1 px-6 md:px-12 py-10 flex flex-col justify-between">
          <div>
            {/* Title & Subtitle Matching the Reference Image Details */}
            <div className="text-center md:text-left mb-12 pt-10">
              <h2 className="text-white text-5xl md:text-8xl font-extrabold tracking-tight mb-3 text-center">
                {query ? "Search Results" : activeNav}
              </h2>
              <p className="text-[#7c8a93] text-sm md:text-2xl text-center">
                {query ? `Showing results for "${query}"` : getSubtitle()}
              </p>
            </div>

            {/* Grid display module */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <div className="aspect-[2/3] rounded-xl bg-[#162436] animate-pulse" />
                    <div className="h-3 w-3/4 bg-[#162436] rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-[#162436] rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-red-400 text-sm">{error}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentMovies.map((movie) => {
                  const genres = movie.genre_ids?.slice(0, 2).map((id) => genreMap[id]).filter(Boolean) || [];

                  return (
                    <Link href={`/movies/${movie.id}`} key={movie.id} className="block group">
                      <div className="flex flex-col gap-3 mb-8 cursor-pointer pt-5">
                        <div className="relative rounded-xl aspect-[2/3] bg-[#162436]">
                          {/* Rating Badge floating perfectly */}
                          <div className="absolute left-1/2 -translate-x-1/2 -top-5 z-20 w-12 h-8 bg-yellow-500 rounded-[40px] flex items-center justify-center shadow-lg">
                            <span className="text-[#081b27] text-lg font-bold">
                              {movie.vote_average?.toFixed(1)}
                            </span>
                          </div>

                          {movie.poster_path ? (
                            <Image
                              src={IMG_BASE_URL + movie.poster_path}
                              alt={movie.title}
                              fill
                              className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500 px-3 text-center">
                              No poster available
                            </div>
                          )}

                          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="text-slate-300 text-[10px] line-clamp-3 opacity-70">
                              {movie.overview}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-300">
                          <StarRating size="text-xl" rating={movie.vote_average / 2} />
                          <span>•</span>
                          <span className="uppercase text-xs tracking-wider">
                            {movie.release_date?.split("-")[0] || "TBA"}
                          </span>
                        </div>

                        <p className="text-white font-bold text-lg leading-tight px-1">
                          {movie.title}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {genres.map((genre) => (
                            <GenreTag key={genre} genre={genre} />
                          ))}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pagination Controls Footer Container */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-6 mt-16 pt-6 border-t border-white/5">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-5 py-2 rounded-lg font-bold bg-[#081b27] text-white hover:bg-[#0c2737] disabled:opacity-30 disabled:cursor-not-allowed transition-opacity text-sm"
              >
                Previous
              </button>

              <span className="text-gray-400 text-sm font-semibold">
                Page <span className="text-[#f1b722]">{currentPage}</span> of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-5 py-2 rounded-lg font-bold bg-[#f1b722] text-[#081b27] hover:bg-[#d6a11e] disabled:opacity-30 disabled:cursor-not-allowed transition-opacity text-sm"
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div className="bg-black border-l border-white/5 px-6 py-10 w-72 shrink-0 hidden md:block">
          <MovieSidebar
            spotlightMovies={movies.slice(0, 3).map(movie => ({
              id: movie.id,
              title: movie.title,
              rating: movie.vote_average?.toFixed(1),
              image: movie.poster_path ? IMG_BASE_URL + movie.poster_path : null,
            }))}
            onSearch={(q) => { setQuery(q.trim()); }}
            activeNav={activeNav}
            onNavChange={(label) => {
              setQuery(""); 
              setActiveNav(label);
            }}
          />
        </div>

      </div>
    </div>
  );
}