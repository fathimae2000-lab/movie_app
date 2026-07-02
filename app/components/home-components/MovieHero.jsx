"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { tmdb } from "@/services/api";
import StarRating from "../StarRating";
import Loading from "../../components/Loading";
import { useGenres } from "@/app/hooks/useGenre";
import GenreTag from "../GenreTag";
import Link from "next/link";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export default function MovieHero() {
  const [movies, setMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const genreMap = useGenres();

  useEffect(() => {
    setLoading(true);
    setError("");

    const controller = new AbortController();

    tmdb
      .get("/trending/movie/day", {
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
  }, []);

  if (loading) return <Loading />;
  if (error) return (
    <section className="w-full h-full flex items-center justify-center bg-[#081b27]  text-red-400 text-sm">
      Failed to load: {error}
    </section>
  );
  if (!movies.length) return null;

  const movie = movies[activeIndex];
  const filledStars = Math.round(movie.vote_average / 2);
  const releaseFormatted = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const genres = movie.genre_ids?.slice(0, 2).map((id) => genreMap[id]).filter(Boolean) || [];

    return (
    <section className="relative w-full h-[900px] overflow-hidden bg-[#081b27]">

      {/* Background Image */}
      {movie.backdrop_path && (
        <Image
          src={`${TMDB_IMAGE_BASE}${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover object-center opacity-70 transition-opacity duration-700"
          priority
        />
      )}

      {/* Overlays */}
   
      <div className="relative z-10 flex flex-col justify-center h-full max-w-3xl p-44 gap-2.5">
        <div className="mb-3 inline-flex items-center justify-center w-14 h-10 rounded-2xl bg-yellow-400 text-black font-extrabold text-xl">
          {movie.vote_average.toFixed(1)}
        </div>

        <h1 className="text-white font-extrabold text-5xl md:text-7xl leading-tight mb-3 tracking-tight drop-shadow-lg line-clamp-1">
          {movie.title}
        </h1>

        <div className="flex items-center gap-4 mb-4">
          <StarRating rating={movie.vote_average/2}  />
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
           <Link href={`/movies/${movie.id}`}>
          <button className="mt-6 w-fit border border-white/30 px-6 py-2 uppercase text-xs font-bold hover:bg-white hover:text-black transition-all">
            Read More
          </button>
        </Link>
        
      </div>

      {/* Indicators */}
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
   