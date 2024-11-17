import { connectmongodb } from "@/lib/dbConnect";
import { EmailSchedule } from "@/models/EmailSchedule";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req,res){
    const session = await getServerSession({ req });

    if (!session) {
      return NextResponse.json({message : "Unauthorized"},{status : 401})
    }
    await connectmongodb()
    const { userEmail, recipientEmail, subject, body, dayOfWeek, durationWeeks } = await req.json()
    try {
        const emailSchedule = new EmailSchedule({
            userEmail,
            recipientEmail,
            subject,
            body,
            dayOfWeek,
            durationWeeks,
          });
          await emailSchedule.save();
          return NextResponse.json({message : "Email schedule saved successfully"},{status : 201})
    } catch (error) {
        console.error(error)
    }
}