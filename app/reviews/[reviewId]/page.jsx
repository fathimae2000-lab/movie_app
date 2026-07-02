"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { tmdb } from "@/services/api";
import { Catamaran, Roboto } from "next/font/google";
import ReactMarkdown from "react-markdown";

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function ReviewPage() {
  const { reviewId } = useParams();
  const router = useRouter();

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!reviewId) return;

    setLoading(true);
    setError("");
    const controller = new AbortController();

    tmdb
      .get(`/review/${reviewId}`, {
        params: { api_key: `${process.env.NEXT_PUBLIC_API_KEY}` },
        signal: controller.signal,
      })
      .then((res) => {
        setReview(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [reviewId]);

  const avatarSrc = (avatarPath, author) =>
    avatarPath
      ? avatarPath.startsWith("/https")
        ? avatarPath.substring(1)
        : `https://image.tmdb.org/t/p/w500${avatarPath}`
      : `https://ui-avatars.com/api/?name=${author}`;

  return (
    <section
      className={`${roboto.className} bg-[#081b27] min-h-screen px-6 py-12 md:px-24 md:py-20`}
    >
      <div className="max-w-3xl mx-auto">
        {/* Back navigation */}
        <button
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center gap-2 text-slate-400 text-sm font-medium hover:text-white transition-colors cursor-pointer group"
        >
          <span className="text-lg transform group-hover:-translate-x-1 transition-transform">
            &larr;
          </span>{" "}
          Back to Highlights
        </button>

        {loading ? (
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-24 w-24 rounded-full bg-[#162436] mb-6" />
            <div className="h-8 w-48 bg-[#162436] rounded mb-4" />
            <div className="w-full h-80 bg-[#162436] rounded-2xl mt-6" />
          </div>
        ) : error ? (
          <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 py-4 rounded-xl">
            {error}
          </div>
        ) : !review ? (
          <div className="text-slate-400 text-center py-20">Review not found.</div>
        ) : (
          <div>
            {/* Header / Meta Block */}
            <div className="flex flex-col items-center text-center mb-12 relative">
              <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-xl ring-4 ring-[#162436] bg-[#162436] mb-4">
                <img
                  src={avatarSrc(review.author_details?.avatar_path, review.author)}
                  alt={review.author}
                  className="w-full h-full object-cover"
                />
              </div>

              <h1
                className={`${catamaran.className} text-white font-extrabold text-3xl md:text-4xl tracking-tight`}
              >
                Review by {review.author}
              </h1>

              <div className="flex items-center gap-3 mt-4">
                {review.author_details?.rating && (
                  <div className="bg-yellow-500 text-[#081b27] px-4 py-1.5  rounded-[40px] text-sm font-bold shadow-md">
                    ★ {review.author_details.rating.toFixed(1)}
                  </div>
                )}
                {review.created_at && (
                  <span className="text-slate-400 text-xs font-medium uppercase tracking-wider bg-[#162436] px-3 py-1.5 rounded-full">
                    {new Date(review.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
              </div>
            </div>

            {/* Main Content Review Card Container */}
            <div className="bg-[#162436] rounded-2xl p-6 md:p-10 shadow-2xl border border-slate-700/30">
              <div className="prose prose-invert max-w-none text-slate-300 text-[16px] md:text-[17px] leading-8 font-light space-y-4">
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />,
                    h1: ({ node, ...props }) => <h1 className="text-white font-bold text-xl mt-4" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-white font-semibold text-lg mt-3" {...props} />,
                    strong: ({ node, ...props }) => <strong className="text-white font-semibold" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2 space-y-1" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2 space-y-1" {...props} />,
                  }}
                >
                  {review.content}
                </ReactMarkdown>
              </div>
            </div>

            {/* TMDB External link anchor */}
            {review.url && (
              <div className="flex justify-center mt-10">
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-transparent border border-slate-600 text-slate-300 hover:text-white hover:bg-[#1e3148] hover:border-transparent text-xs font-medium tracking-widest uppercase py-3 px-8 rounded-full transition-all duration-200"
                >
                  View Original on TMDB &rarr;
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}