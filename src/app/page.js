import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"

function Home() {
  return (
    <div className="w-[60%] mx-auto">
      <Navbar />
      <Hero />
      <Footer/>
    </div>
  )
}

export default Home