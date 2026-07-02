"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { tmdb } from "@/services/api";
import StarRating from "../StarRating";
import { useGenres } from "@/app/hooks/useGenre";
import GenreTag from "../GenreTag";
import Link from "next/link";

const tabs = [
  { label: "Author Picks", endpoint: "/movie/top_rated" },
  { label: "Featured",     endpoint: "/movie/now_playing" },
  { label: "New",          endpoint: "/movie/upcoming" },
];

const IMG_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function HighlightSection() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const genreMap = useGenres();

  useEffect(() => {
    setLoading(true);
    setError("");

    const controller = new AbortController();

    tmdb
      .get(activeTab.endpoint, {
        params: { api_key: process.env.NEXT_PUBLIC_API_KEY },
        signal: controller.signal,
      })
      .then((res) => {
        setMovies(res.data.results?.slice(0, 4) || []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [activeTab]);

  return (
    <section className="bg-[#081b27] px-6 py-10 md:pt-28 md:pb-35">
      {/* Header Row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-around mb-10">
        <div>
          <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight">
            Highlights today
          </h2>
          <p className="text-slate-400 mt-3 font-light text-xl">
            Be sure not to miss these reviews today.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab)}
              className={`px-7 py-3 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab.label === tab.label
                  ? "bg-white text-[#081b27]"
                  : "bg-[#162436] text-slate-300 hover:bg-[#1e3148]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:px-40">
          {movies.map((movie) => {
            const genres = movie.genre_ids?.slice(0, 2).map((id) => genreMap[id]).filter(Boolean) || [];

            return (
              <Link key={movie.id} href={`/movies/${movie.id}`}>
                <div className="flex flex-col gap-3 group cursor-pointer">
                  {/* Poster Card */}
                  <div className="relative rounded-xl overflow-visible aspect-[2/3] bg-[#162436] mt-6">
                    {/* Rating Circle */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-5 z-20   w-12 h-8   bg-yellow-500 rounded-[40px] flex items-center justify-center shadow-lg">
                      <span className="text-[#081b27] text-lg font-bold">
                        {movie.vote_average?.toFixed(1)}
                      </span>
                    </div>

                    <Image
                      src={IMG_BASE_URL + movie.poster_path}
                      alt={movie.title}
                      fill
                      className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    {/* Overview */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-slate-300 text-[8px] line-clamp-3 opacity-70">
                        {movie.overview}
                      </p>
                    </div>
                  </div>

                  {/* Stars + Year */}
                  <div className="flex items-center gap-2 mt-5 text-sm text-gray-300">
                    <StarRating size="text-2xl" rating={movie.vote_average/2}  />

                    <span>•</span>
                    <span className="uppercase text-xs tracking-wider">
                      {movie.release_date?.split("-")[0]}
                    </span>
                  </div>

                  {/* Title */}
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
    </section>
  );
}