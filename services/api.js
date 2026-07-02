import axios from "axios"

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  params: {
    api_key: `${process.env.NEXT_PUBLIC_API_KEY}`,
  },
})