"use client";

import React from "react";
import Link from "next/link";
import useReviews from "../../hooks/userReviews";

import { Catamaran } from "next/font/google";
import { Roboto } from "next/font/google";

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const ReviewGrid = () => {
  const { reviews, loading } = useReviews();

  if (loading) {
    return (
      <div className="text-white text-center py-20">
        Loading reviews...
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="text-white text-center py-20">
        No reviews available.
      </div>
    );
  }

  return (
    <section className={`${roboto.className} bg-[#081b27] py-12 px-8 mt-20 md:pb-30`}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {reviews.slice(0, 3).map((review) => (
          <div key={review.id} className="flex flex-col gap-4">

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">

              <img
                src={
                  review.author_details.avatar_path
                    ? review.author_details.avatar_path.startsWith("/https")
                      ? review.author_details.avatar_path.substring(1)
                      : `https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`
                    : `https://ui-avatars.com/api/?name=${review.author}`
                }
                alt={review.author}
                className=" h-[450px] object-cover transition duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-4 left-4 text-white">
                <h3
                  className={`${catamaran.className} ml-12 font-extrabold text-4xl leading-10`}
                >
                  {review.author}
                </h3>

                {review.author_details.rating && (
                  <p className="ml-12 mt-2 text-yellow-400">
                        ⭐ {review.author_details.rating}/10
                  </p>
                )}
              </div>
            </div>

            {/* Review */}
            <p
              className={`${roboto.className} text-[17px] text-[#8d9eac] leading-7 mb-6 mt-7 text-center`}
            >
              {review.content.length > 100
                ? `${review.content.slice(0, 100)}...`
                : review.content}
            </p>

            <div className="flex justify-center">
              <Link
                href={`/reviews/${review.id}`}
                className="inline-block border border-white/70 text-white text-sm font-semibold tracking-widest uppercase py-3 px-5 rounded transition duration-300 hover:bg-white hover:text-[#081b27]"
              >
                View Review
              </Link>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
};

export default ReviewGrid;