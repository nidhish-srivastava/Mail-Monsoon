"use client"
import Lottie from 'lottie-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import heroanimation from "../assets/hero-animation.json"

function Hero() {
  const { data: session } = useSession()
  const router = useRouter()
  const navigateToAppPage = () => {
    if (session && session.user) {
      router.push("/app")
    } else {
      signIn("google", {
        callbackUrl: "/app",
      });
    }
  }
  return (
    <div className='flex gap-12 justify-between items-center'>
      <div className="flex w-[52%] my-24 flex-col gap-12">
        <h2 className="text-6xl text-[#a6adba] font-bold">Automate inbox spamming</h2>
        <p className="text-lg font-medium text-[#a6adba] text-opacity-90">Keep on sending your mails and increase your chances of getting a response. </p>
        <button onClick={navigateToAppPage} className="px-5 py-2 rounded-xl w-fit hover:bg-opacity-80 font-medium bg-[#641ae6] text-white">Schedule an email</button>
      </div>
      <div className='w-1/3'>
        <Lottie animationData={heroanimation}/>
      </div>
    </div>
  )
}

export default Hero