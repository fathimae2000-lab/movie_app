// app/about/page.tsx
import { Catamaran } from "next/font/google";
import AboutPage from "../components/about-section/AboutPage";


const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const Page = () => {
  return (
    <>
      {/* ── Hero — background image with bottom gradient fade ── */}
      <div className="relative overflow-hidden h-screen">

        {/* Sharp background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/about image.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Bottom gradient fade into #081b27 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{
            background: "linear-gradient(to bottom, transparent, #081b27)",
          }}
        />

        {/* Hero text */}
        <div
          className={`${catamaran.className} relative z-10 flex items-center justify-center px-4 py-16 mt-25`}
        >
          <div className="text-white max-w-3xl w-full text-center p-8 md:p-12">
            <h1 className="text-7xl font-extrabold mb-6 tracking-tight">
              About Us
            </h1>
            <p className="text-[25px] leading-relaxed text-gray-300">
              Movie Reviews is your source for movie reviews and movie ratings to
              help maximize your movie-going experience. Our easy-to-use movie
              reviews and ratings are based on scores and opinions from respected
              critics, family advocacy groups, and movie fans like you.
            </p>
          </div>
        </div>

      </div>

      {/* ── All sections below share the same #081b27 bg — zero gap ── */}
      <div className="bg-[#081b27]">
        <AboutPage />
      </div>

    </>
  );
};

export default Page;