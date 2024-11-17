import { connectmongodb } from "@/lib/dbConnect";
import { EmailSchedule } from "@/models/EmailSchedule";
import { getServerSession } from "next-auth";

export async function POST(req){
    const session = await getServerSession({ req });

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
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
          res.status(201).json({ message: 'Email schedule saved successfully.' });
    } catch (error) {
        console.error(error)
    }
}