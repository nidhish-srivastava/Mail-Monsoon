import mongoose from "mongoose";

const emailscheduleschema = new mongoose.Schema({
    userEmail : String,
    recipientEmail : String,
    subject : String,
    body : String,
    dayOfWeek : Number,
    durationOfWeeks : Number,
    startDate : {type : Date,default : Date.now},
    weeksSent : {type : Number,default : 0}
})

const EmailSchedule = mongoose.models.EmailSchedule || mongoose.model('EmailSchedule',emailscheduleschema)

export {EmailSchedule}