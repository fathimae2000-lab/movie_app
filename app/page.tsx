import FirstPart from "@/app/components/home-components/FirstPart"
import HighlightsSection from "@/app/components/home-components/HighlightSection"
import MovieHero from "@/app/components/home-components/MovieHero"
import NewReleases from "@/app/components/home-components/NewReleases"
import SearchReview from "@/app/components/SearchReviews"
import Footer from "@/app/components/footer/Footer"
export default function Home() {
  return (
 <>
  <FirstPart />
   <HighlightsSection />
   <MovieHero />
   <NewReleases />

   <SearchReview />
   <Footer />
 </>
  );
}
