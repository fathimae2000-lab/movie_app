"use client";
import React, { useState, useEffect } from "react";
import { tmdb } from "@/services/api";
import DiscoverBody from "../components/discover-section/DiscoverBody";

function Page() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [activeNav, setActiveNav] = useState("All");

  useEffect(() => {
    tmdb
      .get("/movie/now_playing")
      .then((res) => setMovies(res.data.results ?? []))
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <DiscoverBody
      movies={movies}
      activeNav={activeNav}
      setQuery={setQuery}
      setActiveNav={setActiveNav}
    />
  );
}

export default Page;