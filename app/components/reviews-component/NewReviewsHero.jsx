"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import StarRating from "../StarRating";
import GenreTag from "../GenreTag";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/original";

const NAV_META = {
  "All Reviews": { heading: "All Reviews",  sub: "Latest movies now playing in cinemas." },
  "Trending":    { heading: "Trending",      sub: "What everyone's watching this week."   },
  "Coming Soon": { heading: "Coming Soon",   sub: "Films arriving on the big screen soon." },
};

export default function NewReviewsHero({ movies, loading, genreMap, activeNav }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset to first slide when nav changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeNav]);

  // Auto-advance every 6s
  useEffect(() => {
    if (!movies.length) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % movies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [movies]);

  if (loading) {
    return (
      <div className="w-full h-[900px] bg-[#081b27] animate-pulse flex items-center justify-center">
        <span className="text-white/30 text-sm">Loading...</span>
      </div>
    );
  }

  if (!movies.length) return null;

  const movie = movies[activeIndex];
  const { heading, sub } = NAV_META[activeNav] ?? NAV_META["All Reviews"];
  const genres = movie.genre_ids?.slice(0, 3).map((id) => genreMap[id]).filter(Boolean) || [];
  const releaseFormatted = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "TBA";

  return (
    <section className="relative w-full h-[900px] overflow-hidden bg-[#081b27]">
      {movie.backdrop_path && (
        <Image
          key={movie.id}
          src={`${TMDB_IMAGE_BASE}${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover object-center opacity-70 transition-opacity duration-700"
          priority
        />
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 flex flex-col justify-center h-full max-w-3xl px-10 md:px-20 gap-2.5">
        {/* Section heading */}
        <p className="text-[#f1b722] text-xs font-bold tracking-[0.2em] uppercase mb-1">
          {heading} <span className="text-white/40 font-normal normal-case tracking-normal">— {sub}</span>
        </p>

        <div className="mb-3 inline-flex items-center justify-center w-14 h-10 rounded-2xl bg-yellow-400 text-black font-extrabold text-xl">
          {movie.vote_average?.toFixed(1)}
        </div>

        <h1 className="text-white font-extrabold text-5xl md:text-7xl leading-tight mb-3 tracking-tight drop-shadow-lg line-clamp-1">
          {movie.title}
        </h1>

        <div className="flex items-center gap-4 mb-4">
          <StarRating rating={movie.vote_average / 2} />
          <span className="text-white/80 text-sm">{releaseFormatted}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <GenreTag key={genre} genre={genre} />
          ))}
        </div>

        <p className="text-white/75 text-[16px] leading-relaxed max-w-lg mb-6 line-clamp-3">
          {movie.overview}
        </p>

        <button className="w-fit border border-white text-white text-sm font-semibold tracking-widest uppercase px-7 py-3 hover:bg-white hover:text-black transition-all duration-200">
          Read More
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-10 z-10 flex items-center gap-2">
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-6 bg-yellow-400" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}