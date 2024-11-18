import { DOMAIN_URL } from "@/lib/util" 

export default function sitemap() {
  return [
    {
      url: DOMAIN_URL,
      lastModified: new Date(),
    },
    // What extra that i can do is seo the users as well so programmatically,fetch all users from db then put their Name in the url,last modified will be their time their account were created in db
  ]
}