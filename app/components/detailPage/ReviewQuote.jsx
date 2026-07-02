"use client";

import { Catamaran } from "next/font/google";

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function ReviewQuote() {
  return (
        <div className={`${catamaran.className} px-6 `}>
        <div className="max-w-3xl mx-auto">
            <div className="relative bg-slate-700/85 backdrop-blur-sm p-10 md:p-12">
            <div className="absolute left-0 top-0 h-full w-1 bg-[#f1b722]" />

            <blockquote className="text-white text-xl md:text-[26px] leading-10 font-semibold">
                “Christopher Nolan’s space exploration epic is serious
                science fiction with brains, beauty and heart. In the age
                of shopping-centre cinema, Christopher Nolan builds
                cathedrals. His films are cold, enormous,
                sky-puncturing constructions, echoey with triumphant
                gloom, rippling with the gasps and whispers of the
                faithful.”
            </blockquote>
            </div>
        </div>
        </div>
  );
}