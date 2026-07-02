"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { tmdb } from "@/services/api";
import StarRating from "../StarRating";
import Loading from "../../components/Loading";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/original";

const LatestReviewsCard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    const controller = new AbortController();

    tmdb
      .get("/movie/top_rated", {
        params: {
          api_key: `${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        signal: controller.signal,
      })
      .then((res) => {
        setMovies(res.data.results?.slice(0, 4) || []);
        setLoading(false);
      })
      .catch((err) => {
        if (
          err.name === "CanceledError" ||
          err.code === "ERR_CANCELED"
        ) {
          return;
        }

        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <> 
    
      <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight text-center mb-10 mt-24">
        Our latest Reviews
      </h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-red-400 text-sm">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:px-40">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col gap-3 group cursor-pointer"
            >
              {/* Poster Card */}
              <div className="relative rounded-xl overflow-visible aspect-[2/3] bg-[#162436] mt-6">
                
                {/* Rating Circle */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-5 z-20   w-12 h-8  bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-[#0d1b2a] text-sm font-bold">
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
                <StarRating
                  size="text-xl"
                  rating={movie.vote_average/2}
                />
                <span>•</span>
                <span className="uppercase text-xs tracking-wider">
                  {movie.release_date?.split("-")[0]}
                </span>
              </div>

              {/* Title */}
              <p className="text-white font-bold text-lg leading-tight px-1">
                {movie.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default LatestReviewsCard;