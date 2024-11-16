import nodemailer from "nodemailer"
import { connectmongodb } from "@/lib/dbConnect"
import { EmailSchedule } from "@/models/EmailSchedule";

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Cron job is running everyday at midnight and checks in the db what all schedules are present then iterates over those schedules and sent mails if its the specified day by the user 
export async function GET() {
    // If we have 100 entries then 100 mails will be spent for that day,wudnt it be a load ? To Solve this problem we will send mails parallely using Promise.all 
    const now = new Date()
    const dayOfWeek = now.getDay()

    await connectmongodb()

    const schedules = await EmailSchedule.find({
        dayOfWeek,
        startDate: { $lte: now },  // lte means less than equal to
    });
    for (const schedule of schedules) {
        const { userEmail, recipientEmail, subject, body, durationOfWeeks, weeksSent } = schedule
        if (weeksSent < durationOfWeeks) {
            if (dayOfWeek == schedule.dayOfWeek) {
                const mailOptions = {
                    from: userEmail,
                    to: recipientEmail,
                    subject,
                    text: body
                }

                transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                        console.error("Error sending mail", error)
                    } else {
                        console.log("EMail sent", info.response);
                        weeksSent += 1;
                        await schedule.save();

                    }
                })
            }
        }
        else {
            await EmailSchedule.deleteOne({ _id: schedule._id })
        }
    }
}
