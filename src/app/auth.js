import GoogleProvider from 'next-auth/providers/google'
import { getServerSession } from "next-auth"

const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
}

const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }