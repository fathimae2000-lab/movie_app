"use client"
import { useEffect, useState } from "react"
import StarRating from "../StarRating"
import { tmdb } from "../../../services/api"
import Loading from "../Loading"
import Link from "next/link"
import { useGenres } from "@/app/hooks/useGenre"
import GenreTag from "../../components/GenreTag"

const IMG_BASE_URL = "https://image.tmdb.org/t/p/original"

const MovieCard = ({ movie, genreMap, isLarge = false }) => {
  const genres = movie.genre_ids?.slice(0, 2).map((id) => genreMap[id]).filter(Boolean) || []

  return (
    <div
      className={`relative overflow-hidden rounded-sm text-white flex flex-col justify-end p-6 group min-h-[300px] transition-transform duration-300 hover:scale-[1.01] ${isLarge ? "md:h-full" : "h-full"}`}
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0.2) 60%), url(${IMG_BASE_URL + movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="z-10">
        <span className="bg-yellow-500 text-black px-3 py-2 inline-block mb-1 rounded-[15px] text-xs font-bold">
          {movie.vote_average?.toFixed(1)}
        </span>

        <h2 className={`${isLarge ? "text-2xl sm:text-3xl md:text-5xl md:font-bold" : "text-xl md:text-2xl"} font-bold mt-2 leading-tight`}>
  {movie.title}
</h2>

        <div className="flex items-center gap-2 mt-2 text-sm text-gray-300">
          <StarRating rating={movie.vote_average/2} />
          <span>•</span>
          <span className="uppercase text-xs tracking-wider">{movie.release_date?.split("-")[0]}</span>
        </div>

        {isLarge && (
          <p className="mt-4 text-gray-200 line-clamp-3 max-w-xl hidden md:block">
            {movie.overview}
          </p>
        )}

        {/* GenreTag — renders each resolved genre name */}
        <div className="flex flex-wrap gap-2 mt-3">
          {genres.map((genre) => (
            <GenreTag key={genre} genre={genre} />
          ))}
        </div>

        <Link href={`/movies/${movie.id}`}>
          <button className="mt-6 w-fit border border-white/30 px-6 py-2 uppercase text-xs font-bold hover:bg-white hover:text-black transition-all">
            Read More
          </button>
        </Link>
      </div>
    </div>
  )
}

const FirstPart = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const genreMap = useGenres()

  useEffect(() => {
    const controller = new AbortController()

    tmdb
      .get("/movie/popular", {
        params: { api_key: process.env.NEXT_PUBLIC_API_KEY },
        signal: controller.signal,
      })
      .then((res) => {
        setMovies(res.data.results || [])
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") return
        setError(err.message)
        setLoading(false)
      })

    return () => controller.abort()
  }, [])

  if (loading) return <Loading />

  if (error) return (
    <div className=" min-h-screen flex items-center justify-center text-red-500">
      <p>{error}</p>
    </div>
  )

  if (movies.length === 0) return (
    <div className="bg-[#081b27] min-h-screen flex items-center justify-center text-white">
      <p>No movies found</p>
    </div>
  )

  return (
    <div className="bg-black p-4 md:p-10 min-h-screen">
      <div className="flex items-center gap-2 mb-8 text-white">
        <div className="bg-yellow-500 p-1 rounded">🎬</div>
        <h1 className="text-3xl font-light uppercase tracking-tighter">
          Movie <span className="font-bold">Reviews</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
        {/* Left column - Large featured card */}
        <div className="md:row-span-2">
          <MovieCard movie={movies[0]} genreMap={genreMap} isLarge={true} />
        </div>

        {/* Right top - Medium card */}
        <div>
          <MovieCard movie={movies[1]} genreMap={genreMap} />
        </div>

        {/* Right bottom - Two small cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MovieCard movie={movies[2]} genreMap={genreMap} />
          <MovieCard movie={movies[3]} genreMap={genreMap} />
        </div>
      </div>
    </div>
  )
}

export default FirstPart