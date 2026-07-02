import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomReviews = async () => {
      try {
        // Get popular movies
        const moviesRes = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: { api_key: API_KEY, page: 1 },
          }
        );

        const movies = moviesRes.data.results;

        // Shuffle movies
        const shuffled = [...movies].sort(() => Math.random() - 0.5);

        // Find the first movie that has reviews
        for (const movie of shuffled) {
          const reviewRes = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/reviews`,
            {
              params: { api_key: API_KEY },
            }
          );

          if (reviewRes.data.results.length >= 3) {
            setReviews(reviewRes.data.results);
            break;
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomReviews();
  }, []);

  return { reviews, loading };
};

export default useReviews;