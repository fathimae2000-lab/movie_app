"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Catamaran } from "next/font/google";
import { MdAccessTime } from "react-icons/md";
import { FaTag } from "react-icons/fa";

import { tmdb } from "@/services/api";
import Loading from "../Loading";
import StarRating from "../StarRating";
import ReviewQuote from "./ReviewQuote";

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
});

const IMG_BASE_URL = "https://image.tmdb.org/t/p/original";

const ScoreBadge = ({ score }) => (
  <div className="absolute -top-10 -left-10 z-20 w-24 h-24 rounded-full bg-[#f1b722] flex items-center justify-center shadow-lg">
    <span
      className={`${catamaran.className} text-[#07263a] text-4xl font-extrabold`}
    >
      {score}
    </span>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="flex items-baseline gap-4">
    <span className="text-white font-bold w-24 shrink-0">
      {label}:
    </span>
    <span className="text-[#b0c4d4]">
      {value}
    </span>
  </div>
);

export default function MainPart() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchMovie = async () => {
      try {
        setLoading(true);

        const movieRes = await tmdb.get(
          `/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
          {
            signal: controller.signal,
          }
        );

        const creditsRes = await tmdb.get(
          `/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
          {
            signal: controller.signal,
          }
        );

        setMovie(movieRes.data);
        setCredits(creditsRes.data);
      } catch (err) {
        if (
          err.name !== "CanceledError" &&
          err.code !== "ERR_CANCELED"
        ) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();

    return () => controller.abort();
  }, [id]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Movie not found
      </div>
    );
  }

  const director = credits?.crew?.find(
    (person) => person.job === "Director"
  );

  const score = movie.vote_average?.toFixed(1);

  return (
    <div
      className={`${catamaran.className} relative overflow-hidden`}
      style={{
        backgroundImage: movie.backdrop_path
          ? `url(${IMG_BASE_URL}${movie.backdrop_path})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundPosition: "top center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-950/60" />

      {/* Content */}
      <div className="relative z-10 px-35 py-20  pb-4">
        <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="flex flex-col md:flex-row gap-16">

            {/* Poster */}
            <div className="relative group">
              <ScoreBadge score={score} />


              <img
                src={`${IMG_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="
      w-72
      rounded-2xl
      shadow-2xl
      transition-all
      duration-500
      ease-out
      group-hover:scale-105
      group-hover:-translate-y-2
      group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)]
    "
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-white">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 w-[460px]">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-5 mb-8">
                <StarRating rating={movie.vote_average} />

                <span className="flex items-center gap-2 text-[#f1b722]">
                  <FaTag />
                  {movie.genres?.map((g) => g.name).join(", ")}
                </span>

                <span className="flex items-center gap-2">
                  <MdAccessTime />
                  {movie.release_date}
                </span>
              </div>

              <p className="text-lg text-gray-200 max-w-xl mb-10">
                {movie.overview}
              </p>

              <div className="space-y-3">
                <DetailRow
                  label="Duration"
                  value={`${movie.runtime} min`}
                />

                <DetailRow
                  label="Director"
                  value={director?.name || "Unknown"}
                />

                <DetailRow
                  label="Language"
                  value={movie.original_language?.toUpperCase()}
                />

                <DetailRow
                  label="Rating"
                  value={movie.vote_average?.toFixed(1)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="pb-32  mt-50 ">
          <ReviewQuote />
        </section>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-b from-transparent via-[#06192b]/70 to-[#06192b]" />
    </div>
  );
}