"use client"
import { useState } from "react"
import { MdAttachFile } from "react-icons/md";

function Home() {
  const [hrEmail, setHrEmail] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [weekDay, setWeekDay] = useState("")
  const [numberOfWeeks, setNumberOfWeeks] = useState(1)
  const [subject, setSubject] = useState("")
  const [emailBody,setEmailBody] = useState("")

  return (
    <>
      <div>
        <input type="text" className="border" value={hrEmail} onChange={e => setHrEmail(e.target.value)} placeholder="Enter the email of hr u want to disturb" />
      </div>
      <div>
        <input type="text" className="border" value={userEmail} onChange={e => setUserEmail(e.target.value)} placeholder="Enter your email" />
      </div>
      <div>
        <h3>Enter the email schedule</h3>
        <select className="border" name="" id="" value={weekDay} onChange={e => setWeekDay(e.target.value)}>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <div>
          <label htmlFor="weekNo">Enter the number of weeks you want email the hr</label>
          <input className="border" id="weekNo" value={numberOfWeeks} onChange={e => setNumberOfWeeks(+e.target.value)} type="number" placeholder="Enter the number of weeks you want to pareshaaning the hr" />
        </div>
        <div>

        </div>
        <div>
          <label htmlFor="write-email">Write the Email</label>
          <div>
            <input placeholder="Subject" type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} />
          </div>
          <textarea name="" value={emailBody} onChange={e=>setEmailBody(e.target.value)} placeholder="" id=""></textarea>
        </div>
        <span>
          <MdAttachFile/>
        </span>
        <button className="btn+">Submit</button>
      </div>
    </>
  )
}

export default Home