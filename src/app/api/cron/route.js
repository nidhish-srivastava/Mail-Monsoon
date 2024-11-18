import nodemailer from "nodemailer"
import { connectmongodb } from "@/lib/dbConnect"
import { EmailSchedule } from "@/models/EmailSchedule";
import { NextResponse } from "next/server";

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Cron job is running everyday at midnight and checks in the db what all schedules are present then iterates over those schedules and sent mails if its the specified day by the user 
// If we have 100 entries then 100 mails will be spent for that day,wudnt it be a load ? To Solve this problem we will send mails parallely using Promise.all 
export async function GET() {
    const now = new Date()
    const weekDay = now.getDay()
    
    await connectmongodb()

    const schedules = await EmailSchedule.find({
        weekDay,
        createdAt: { $lte: now },  // lte means less than equal to
    })
    
    for (const schedule of schedules) {
        const { userEmail, recipientEmail, subject, body, numberOfWeeks, weeksSent } = schedule
        if (weeksSent < numberOfWeeks) {
            if (weekDay == schedule.weekDay) {
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
                        console.log("Email sent", info.response);
                        schedule.weeksSent += 1;
                        await schedule.save();

                    }
                })
            }
        }
        else {
            await EmailSchedule.deleteOne({ _id: schedule._id })
        }
    }
    return NextResponse.json({status : 200})
}
