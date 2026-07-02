"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { tmdb } from "@/services/api";
import { useGenres } from "@/app/hooks/useGenre";
import GenreTag from "../GenreTag";
import Loading from "../../components/Loading";
import StarRating from "../StarRating";
import { Catamaran } from "next/font/google";
import Link from "next/link";

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
});

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w780";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/original";

function MovieCard({ movie, genreMap }) {
  const genres =
    movie.genre_ids?.slice(0, 2).map((id) => genreMap[id]).filter(Boolean) || [];

  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="flex flex-col cursor-pointer group mt-6">
        <div className="relative w-full h-48 rounded-xl overflow-visible bg-[#162436]">
          <div className="absolute left-1/2 -translate-x-1/2 -top-5 z-20 w-12 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-[#081b27] text-lg font-extrabold">
              {movie.vote_average?.toFixed(1)}
            </span>
          </div>

          {movie.backdrop_path ? (
            <Image
              src={`${TMDB_IMAGE_BASE}${movie.backdrop_path}`}
              alt={movie.title}
              fill
              className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 rounded-xl" />
          )}
        </div>

        <div className="pt-4 pb-2 px-1 flex flex-col gap-1">
          <StarRating rating={movie.vote_average/ 2} />
          <h3 className="text-white font-bold text-xl mt-1 line-clamp-1 group-hover:text-yellow-400 transition-colors">
            {movie.title}
          </h3>

          <div className="flex flex-wrap gap-2 mt-1">
            {genres.map((genre) => (
              <GenreTag key={genre} genre={genre} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function MovieGrid() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const genreMap = useGenres();

  useEffect(() => {
    setLoading(true);
    setError("");

    const controller = new AbortController();

    tmdb
      .get("/movie/upcoming", {
        params: {
          api_key: `${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        signal: controller.signal,
      })
      .then((res) => {
        setMovies(res.data.results?.slice(0, 5) || []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED")
          return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  if (loading) return <Loading />;

  if (error)
    return (
      <div className="w-full py-20 text-center text-red-400 text-sm">
        Failed to load: {error}
      </div>
    );

  if (!movies || movies.length < 5) return null;

  const [featured, card1, card2, card3, card4] = movies;

  const featuredGenres =
    featured.genre_ids
      ?.slice(0, 2)
      .map((id) => genreMap[id])
      .filter(Boolean) || [];

  return (
    <section className="bg-[#081b27] px-6 py-10 md:pt-28 md:pb-35">
      <div>
        <h2 className={`${catamaran.className} text-white text-3xl md:text-8xl font-extrabold leading-tight text-center`}>
          New Releases
        </h2>
        <p className={`${catamaran.className} text-slate-400 mt-3 font-light text-2xl text-center mb-12`}>
          Our most recently released reviews.
        </p>
      </div>
      <div className="bg-[#081b27] px-10 pb-10">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 items-start">
          
          {/* Featured Card */}
          <Link href={`/movies/${featured.id}`} className="relative row-span-2 rounded-xl overflow-visible cursor-pointer group min-h-[580px] mt-6 block">
            <div className="absolute left-1/2 -translate-x-1/2 -top-5 z-20 w-12 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-[#081b27] text-lg font-extrabold">
                {featured.vote_average?.toFixed(1)}
              </span>
            </div>
            
            {featured.poster_path && (
              <Image
                src={`${IMG_BASE_URL}${featured.poster_path}`}
                alt={featured.title}
                fill
                className="object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
              />
            )}

            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h2 className="text-white font-extrabold text-3xl leading-tight uppercase mb-3 group-hover:text-yellow-400 transition-colors">
                {featured.title}
              </h2>

              <p className="text-white/60 text-xs line-clamp-1 mb-1 tracking-wide">
                {featured.overview?.split(".")[0]}.
              </p>

              <p className="text-white/40 text-[10px] line-clamp-3 mb-3">
                {featured.overview}
              </p>

              <div className="flex flex-wrap gap-2">
                {featuredGenres.map((genre) => (
                  <GenreTag key={genre} genre={genre} />
                ))}
              </div>
            </div>
          </Link>

          {/* Right Side Small Cards */}
          <MovieCard movie={card1} genreMap={genreMap} />
          <MovieCard movie={card2} genreMap={genreMap} />
          <MovieCard movie={card3} genreMap={genreMap} />
          <MovieCard movie={card4} genreMap={genreMap} />
        </div>
      </div>
    </section>
  );
}