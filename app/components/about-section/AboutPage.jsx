import React from 'react'
import ReviewGrid from "./ReviewCard"
import DetailReview from './DetailReview'
import LatestReviewsCard from "./LatestReviewsCard"
import Footer from "../../components/footer/Footer"
import SearchReview from '../SearchReviews'

function AboutPage() {
  return (
    <div className='bg-[#081b27] h-full w-full'>
      <ReviewGrid  />
      <DetailReview/>

         <section className="bg-[#06192b] -mt-20 relative z-20 pb-20">
        <LatestReviewsCard />
      </section>

      <div className='mt-20'>
        <SearchReview />
      <Footer />
      </div>
      
    </div>
  )
}

export default AboutPage

