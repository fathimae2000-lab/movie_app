// app/hooks/useGenreMovies.js
import { useEffect, useState } from "react"
import { tmdb } from "@/services/api"

export function useGenreMovies(genreId) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!genreId) {
      setMovies([])
      return
    }

    setLoading(true)
    tmdb
      .get("/discover/movie", {
        params: {
          with_genres: genreId,
          sort_by: "popularity.desc",
          page: 1,
        },
      })
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.error("Genre movies fetch failed:", err.message))
      .finally(() => setLoading(false))
  }, [genreId])

  return { movies, loading }
}