import { useEffect, useState } from "react"
import { tmdb } from "@/services/api"

export function useGenres() {
  const [genres, setGenres] = useState([])   
  const [genreMap, setGenreMap] = useState({}) 
  const [loading, setLoading] = useState(true)

// useGenres.js
useEffect(() => {
  tmdb
    .get("/genre/movie/list") 
    .then((res) => {
      const list = res.data.genres
      const map = {}
      list.forEach((g) => { map[g.id] = g.name })
      setGenres(list)
      setGenreMap(map)
    })
    .catch((err) => console.error("Genre fetch failed:", err.message))
    .finally(() => setLoading(false))
}, [])
  return { genres, genreMap, loading }
}