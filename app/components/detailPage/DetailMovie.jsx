"use client";

import { Roboto } from "next/font/google";
import { Catamaran } from "next/font/google";

import Image from "next/image";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
});



const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function DetailMovie() {
    return (
        <section
            className={`${roboto.className} bg-[#06192b] pb-7`}
        >
            <div className="max-w-3xl mx-auto">
                <p className="text-[#9cabb6] text-lg md:text-base leading-6 font-normal ">
                    He’s the preeminent blockbuster auteur of our time, a fiercely
                    rational puzzle-maker and problem-solver; the Mies van der Rohe of
                    Hollywood. He prefers shooting on film to digital cameras, and strives
                    to achieve special effects on set rather than at a
                    computer-graphics workstation. The rotating hotel corridor scene in
                    Inception – a fist-fight in which the combatants spin and click
                    together like the workings of a combination lock – is Nolan’s vision
                    of cinema in miniature.
                </p>



                <h2 className="text-white text-base md:text-3xl font-bold mt-16 mb-8">
                    A unique intro to the movie
                </h2>

                <p className="text-[#9cabb6] text-base md:text-base leading-6 font-normal mb-10">
                    Like Kubrick, he has a reputation for chilliness,
                    and none of his films are ever likely to be mistaken for romantic comedy.
                    Memento, his 2000 breakthrough hit, is about the vagaries of truth and memory,
                    while his recent Batman trilogy, which culminated two years ago in The Dark Knight Rises,
                    deals with order and chaos, and society’s schizophrenic craving for both. No other filmmaker working today
                    is as determined to use blockbuster spectacle to say something big about our world – even
                    as he sends his characters zooming away from it, through wormholes, at light-speed.
                </p>

                <div className="overflow-hidden rounded-lg">
                    <Image
                        src="/deatilsImg.jpg"
                        alt="Movie Scene"
                        width={1600}
                        height={800}
                        className="rounded-lg object-cover w-full h-auto transition-transform duration-500 hover:scale-105"
                    />
                </div>

                <p className="text-[#9cabb6] text-lg md:text-base leading-6 font-normal mt-18">
                    A scene from Christopher Nolan's 'Interstellar' A scene from Christopher Nolan's 'Interstellar' Credit: Melinda Sue Gordon Interstellar is Nolan’s best and most brazenly ambitious film to date. Doubling down on the Kubrick comparisons, he’s made his own sweeping space odyssey in which a team of astronauts, led by Matthew McConaughey’s stoically smouldering Coop, venture into the great beyond in search of a new home for humanity. Starlight whirls, planets rock on their axes, and spacecraft cartwheel through nothingness, all soundtracked by a reverential Hans Zimmer score that’s equal parts Johann Strauss and Philip Glass.
                </p>

                <p className="text-[#9cabb6] text-lg md:text-base leading-6 font-normal mt-6">
                    The film takes place in the near future, with Earth in the grip of The Blight, an airborne disease that causes food crops to turn to grey-brown powder. It rolls and billows across the land, piling up around houses and cars like the dust-drifts in Andrei Tarkovsky’s Stalker, another film in which the characters slip between time’s cogs.

                </p>

                <h2 className="text-white text-base md:text-3xl font-bold mt-16 mb-8 w-[800px]">
                    The ending of the movie is an amazing experience

                </h2>

                <p className="text-[#9cabb6] text-lg md:text-base leading-6 font-normal mt-10">
                    Coop (the allusion to Gary Cooper is vigorously intended) is a former Nasa pilot who’s pitching in with the dig for victory effort, although for him the plan to sit out the famine lacks ambition – and therefore humanity.
                </p>

                <div className={`${catamaran.className} px-6 mt-12 `}>
                    <div className="max-w-3xl mx-auto">
                        <div className="relative bg-slate-700/85 backdrop-blur-sm p-10 md:p-12">
                            <div className="absolute left-0 top-0 h-full w-1 bg-[#f1b722]" />

                            <blockquote className="text-white text-xl md:text-[26px] leading-10 font-semibold">
                                “We used to look up and wonder about our place in the stars,” he grumbles. “Now we just look down and worry about our place in the dirt.”
                            </blockquote>
                        </div>
                    </div>
                </div>

                <p className="text-[#9cabb6] text-lg md:text-base leading-6 font-normal mt-18">
                    The catch is that, on the far side of the wormhole, with the planets on the lip of an enormous black hole, time is far more stretched out than it is on Earth, with years, even decades, flashing past in an hour or two. This turns Coop’s quest into a heartbreaking inversion of C. S. Lewis’s Chronicles of Narnia: the real world doesn’t freeze while his adventure unfolds, making childhood last a lifetime, but slips away quicker than ever.
                </p>

                  <div className="overflow-hidden rounded-lg mt-12">
                    <Image
                        src="/manImg.jpg"
                        alt="Movie Scene"
                        width={1600}
                        height={800}
                        className="rounded-lg object-cover w-full h-auto transition-transform duration-500 hover:scale-105"
                    />
                </div>

                <p   className="text-[#9cabb6] text-lg md:text-base leading-6 font-normal mt-18">
                    Jessica Chastain and Casey Affleck star in Christopher Nolan's 'Interstellar' Jessica Chastain and Casey Affleck star in Christopher Nolan's 'Interstellar' Credit: Melinda Sue Gordon But at first, it’s Coop that destiny comes calling for. The strange force in Murph’s room points him towards a restricted airbase where his former Nasa boss Dr. Brand (Michael Caine), is captaining the ‘Lazarus Project’: a secret search for a new habitable planet. “We’re not meant to save the world, we’re meant to leave it,” he explains – a belief bolstered by the recent appearance of a mysterious wormhole near one of Saturn’s moons, through which a cluster of potentially suitable planets have been glimpsed.
                </p>

                
                <p   className="text-[#9cabb6] text-lg md:text-base leading-6 font-normal mt-12">
                        The catch is that, on the far side of the wormhole, with the planets on the lip of an enormous black hole, time is far more stretched out than it is on Earth, with years, even decades, flashing past in an hour or two. This turns Coop’s quest into a heartbreaking inversion of C. S. Lewis’s Chronicles of Narnia: the real world doesn’t freeze while his adventure unfolds, making childhood last a lifetime, but slips away quicker than ever.
                </p>

                      <p   className="text-[#9cabb6] text-lg md:text-base leading-6 font-normal mt-12">
                        Review source: <a href="https://www.telegraph.co.uk/film/interstellar/" target="_blank" rel="noopener noreferrer" className="text-[#f1b722] hover:underline">
                            Telegraph
                        </a>
                    </p>

            </div>
        </section>
    );
}