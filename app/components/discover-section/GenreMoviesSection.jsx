// app/components/GenreMoviesSection.jsx
"use client"
import Image from "next/image"
import { useGenreMovies } from "../../hooks/useGenreMovies"
import StarRating from "../StarRating"
import GenreTag from "../GenreTag"

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500"

export default function GenreMoviesSection({ selectedGenreId, selectedGenreName, genreMap }) {
  const { movies, loading } = useGenreMovies(selectedGenreId)

  // Nothing selected yet
  if (!selectedGenreId) return null

  return (
    <section className="w-full bg-[#081b27] px-6 md:px-16 py-16">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-white text-4xl md:text-7xl font-extrabold">
          {selectedGenreName}
        </h2>
        <p className="text-slate-400 mt-3 text-sm md:text-xl font-light">
          Reviews filtered by category: {selectedGenreName}
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] rounded-xl bg-[#162436] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl ">
          {movies.map((movie) => {
            const genres = movie.genre_ids
              .map((id) => genreMap[id])
              .filter(Boolean)
              .slice(0, 2)

            return (
              <div key={movie.id} className="flex flex-col gap-3 group cursor-pointer ">
                {/* Poster Card */}
                <div className="relative rounded-xl overflow-visible aspect-[2/3] bg-[#162436] mt-6">
                  {/* Rating Circle */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-5 z-20 w-12 h-8 bg-yellow-500 rounded-[40px] flex items-center justify-center shadow-lg">
                    <span className="text-[#081b27] text-lg font-bold">
                      {movie.vote_average?.toFixed(1)}
                    </span>
                  </div>

                  {movie.poster_path && (
                    <Image
                      src={IMG_BASE_URL + movie.poster_path}
                      alt={movie.title}
                      fill
                      className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  )}

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
                  <StarRating size="text-2xl" rating={movie.vote_average / 2} />
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
            )
          })}
        </div>
      )}
    </section>
  )
}