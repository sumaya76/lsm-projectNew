import React from 'react'
import Layout from '../common/layout'
import Hero from '../common/Hero'
import FeaturedCategories from '../common/FeaturedCategories'
import FeaturedCourses from '../common/FeaturedCourses'
import Course from '../common/Course'

export const Home = () => {
  return (
    <div>
   <Layout>
  <Hero />
  <FeaturedCategories />
    <FeaturedCourses />
    <Course />
   </Layout>
        </div>
  )
}
export default Home