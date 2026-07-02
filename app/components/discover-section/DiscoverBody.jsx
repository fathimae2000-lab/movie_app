"use client";
import React, { useState } from "react";
import { Catamaran } from "next/font/google";
import MovieSidebar from "../reviews-component/MovieSidebar";
import DiscoverGrid from "./DiscoverGrid";
import GenreFilterGrid from "./GenreFilterGrid";
import Footer from "../footer/Footer";
import SearchReview from "../SearchReviews";
import { useGenres } from "../../hooks/useGenre";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

function DiscoverBody({ movies = [], activeNav, setQuery, setActiveNav }) {
  const { genres, genreMap } = useGenres();
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  const selectedGenreName = genreMap[selectedGenreId] ?? "";

  return (
    <>
      <div className={`${catamaran.className} pt-21 bg-[#081b27] min-h-screen`}>
        <div className="flex flex-col md:flex-row min-h-screen">

          {/* Main Content */}
          <div className="flex-1 md:pt-10 flex flex-col">

            {/* Title */}
            <div className="text-center md:text-left mb-12 pt-10">
              <h2 className="text-white text-5xl md:text-8xl font-extrabold tracking-tight mb-3 text-center">
                Inspiration
              </h2>
              <p className="text-[#7c8a93] text-sm md:text-2xl text-center">
                Discover our reviews by author favorites or genre:
              </p>
            </div>

            {/* Movie Grid */}
            <div className="py-10">
              <DiscoverGrid movies={movies} />
            </div>

            {/* Genre Filter Grid — once only */}
            <GenreFilterGrid
              genres={genres}
              onGenreSelect={setSelectedGenreId}
            />

          </div>

          {/* Sidebar */}
          <div className="bg-black border-l border-white/5 px-6 py-10 w-72 shrink-0 hidden md:block">
            <MovieSidebar
              spotlightMovies={movies.slice(0, 3).map((movie) => ({
                id: movie.id,
                title: movie.title,
                rating: movie.vote_average?.toFixed(1),
                image: movie.poster_path ? IMG_BASE_URL + movie.poster_path : null,
              }))}
              onSearch={(q) => setQuery(q.trim())}
              activeNav={activeNav}
              onNavChange={(label) => {
                setQuery("");
                setActiveNav(label);
              }}
            />
          </div>
        </div>
      </div>

      

     <div className='pt-20 bg-[#081b27]'>
            <SearchReview />
          <Footer />
          </div>
    </>
  );
}

export default DiscoverBody;