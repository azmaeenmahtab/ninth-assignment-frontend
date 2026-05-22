import React from 'react'
import Navbar from '../Navbar/Navbar'
import BannerIndex from '../Banner/BannerIndex'
import FeaturedSetion from './FeaturedSetion'
import AdoptionProcess from '../adoptionprocess'
import AdoptionMatters from '../adoptionmatters'
import SuccessStory from '../successtory'
import PetOwnerTips from '../petownertips'
import Community from '../community'

const HomeIndex = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <BannerIndex />
      <div className="bg-[#f3e8d5] px-6 py-10 max-w-7xl mx-auto rounded-2xl">
      <FeaturedSetion />
      <AdoptionProcess />
      <AdoptionMatters />
      <SuccessStory />
      <PetOwnerTips />
      <Community />
      </div>
    </div>
  )
}

export default HomeIndex
