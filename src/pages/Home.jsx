import Banner from "../components/home/Banner.jsx"
import Hero from "../components/home/Hero.jsx"
import Features from "../components/home/Features.jsx"
import Testimonials from "../components/home/Testimonials.jsx"
import CallToAction from "../components/home/CAllToAction.jsx"
import Footer from "../components/home/Footer.jsx"

export default function Home () {
  return (
    <>
      <Banner />
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  )
}