"use client"
import Lottie from 'lottie-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import heroanimation from "../assets/hero-animation.json"

function Hero() {
  const { status } = useSession()
  const router = useRouter()
  const navigateToAppPage = () => {
    if(status == "loading") return;
    if (status == "authenticated" ) {
      router.push("/app")
    } else {
      signIn("google", {
        callbackUrl: "/app",
      });
    }
  }
  return (
    <div className='flex sm:gap-8 md:gap-12 justify-between items-center flex-col sm:flex-row'>
      <div className="flex w-[100%] sm:w-[52%] my-24 flex-col gap-12 justify-center items-center sm:items-start">
        <h2 className="text-6xl text-center sm:text-left text-[#a6adba] font-bold">Automate inbox spamming</h2>
        <p className="text-lg font-medium text-[#a6adba] text-opacity-90">Keep on sending your mails and increase your chances of getting a response. </p>
        <button onClick={navigateToAppPage} className="px-5 py-2 rounded-xl w-fit hover:bg-opacity-80 font-medium bg-[#641ae6] text-white">Schedule an email</button>
      </div>
      <div className='w-2/3 sm:w-1/2 md:w-1/3'>
        <Lottie animationData={heroanimation}/>
      </div>
    </div>
  )
}

export default Hero