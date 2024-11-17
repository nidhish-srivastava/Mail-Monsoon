import SigninButton from "@/components/AuthButtons"
import Link from "next/link"

function Home() {
  return (
    <div className="text-center mt-4 space-x-4 flex justify-center">
      <Link href={`/`}>
      </Link>
      <Link href={`/schedule-email`}>
      <button className="btn">Schedule Email</button>
      </Link>
      <SigninButton/>
    </div>
  )
}

export default Home