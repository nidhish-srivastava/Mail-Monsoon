import mongoose from "mongoose";

const emailscheduleschema = new mongoose.Schema({
    userEmail : String,
    recipientEmail : String,
    subject : String,
    body : String,
    weekDay : Number,
    numberOfWeeks : Number,
    weeksSent : {type : Number,default : 0},
    files : [mongoose.Schema.Types.Mixed]
},{
    timestamps : true
})

const EmailSchedule = mongoose.models.EmailSchedule || mongoose.model('EmailSchedule',emailscheduleschema)

export {EmailSchedule}