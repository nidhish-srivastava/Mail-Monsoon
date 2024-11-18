"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// import { MdAttachFile } from "react-icons/md";

function Home() {
  const { data: session } = useSession()
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    recipientEmail: "",
    weekDay: 1,
    numberOfWeeks: 1,
    subject: "",
    body: "",
  });

  const [errors, setErrors] = useState({
    recipientEmail: "",
    weekDay: "",
    numberOfWeeks: "",
    subject: "",
  })


  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validInputCheckHandler = () => {
    const newErrors = {
      recipientEmail: "",
      weekDay: null,
      numberOfWeeks: null,
      subject: "",
    }
    let isValid = true
    if(formData.recipientEmail == session.user.email){
      newErrors.recipientEmail = "You can't send mail to your own gmail account"
      isValid = false
    }
    if (!isValidEmail(formData.recipientEmail)) {
      newErrors.recipientEmail = "Please enter a valid email address"
      isValid = false
    }
    if (formData.weekDay == null) {
      newErrors.weekDay = "Plese select a day of the week"
      isValid = false
    }
    if (formData.subject == "") {
      newErrors.subject = "You haven't entered the subject"
      isValid = false
    }
    if (formData.numberOfWeeks == null) {
      newErrors.numberOfWeeks = "Choose number of weeks"
      isValid = false
    }
    setErrors(newErrors)
    return isValid
  }


  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (!validInputCheckHandler()) {
      return;
    }
    try {
      setIsSubmitting(true)
      const response = await fetch(`/api/schedule-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userEmail: session.user.email }),
      });

      if (response.ok) {
        toast.success("Email scheduled successfully!");
      } else {
        toast.error("Failed to schedule email.");
      }
      setIsSubmitting(false)
    } catch (error) {
      toast.error("An error occurred while scheduling the email.");
      setIsSubmitting(false)
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Toaster />
      <Link href={`/`}>
        <button className="btn absolute left-4 top-2 text-gray-200">Home</button>
      </Link>
      <div className="min-h-screen text-white flex items-center justify-center px-6 py-16 sm:py-6">
        <form
          onSubmit={submitFormHandler}
          className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Schedule Email</h2>
          <div className="space-y-5">
            <div className="space-y-1">
              <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-300">
                Recipient Email
              </label>
              <input
                type="email"
                id="recipientEmail"
                name="recipientEmail"
                className="input focus:outline-none input-bordered bg-gray-700 text-white border-gray-600 w-full"
                value={formData.recipientEmail}
                onChange={changeHandler}
                placeholder="Enter the recipient's email"
                required
              />
              <p className="text-red-500">
                {errors.recipientEmail}
              </p>
            </div>
            <div className="space-y-1">
              <label htmlFor="weekDay" className="block text-sm font-medium text-gray-300">
                Email Schedule
              </label>
              <select
                className="select focus:outline-none select-bordered bg-gray-700 text-white border-gray-600 w-full"
                name="weekDay"
                id="weekDay"
                value={formData.weekDay}
                onChange={changeHandler}
                required
              >
                <option value="" disabled>
                  Select a day
                </option>
                <option value="1">Monday</option>
                <option value="2">Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4">Thursday</option>
                <option value="5">Friday</option>
                <option value="6">Saturday</option>
                <option value="0">Sunday</option>
              </select>
              <p className="text-red-500">
                {errors.weekDay}
              </p>
            </div>

            <div className="space-y-1">
              <label htmlFor="numberOfWeeks" className="block text-sm font-medium text-gray-300">
                Number of Weeks
              </label>
              <input
                className="input focus:outline-none input-bordered bg-gray-700 text-white border-gray-600 w-full"
                id="numberOfWeeks"
                name="numberOfWeeks"
                value={formData.numberOfWeeks}
                onChange={changeHandler}
                type="number"
                min="1"
                placeholder="Enter the number of weeks"
                required
              />
              <p className="text-red-500">
                {errors.numberOfWeeks}
              </p>
            </div>

            <div className="space-y-1">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                Subject
              </label>
              <input
                className="input focus:outline-none input-bordered bg-gray-700 text-white border-gray-600 w-full"
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={changeHandler}
                placeholder="Email subject"
                required
              />
              <p className="text-red-500">
                {errors.subject}
              </p>
            </div>

            <div className="space-y-1">
              <label htmlFor="body" className="block text-sm font-medium text-gray-300">
                Email Body
              </label>
              <textarea
                className="textarea focus:outline-none textarea-bordered bg-gray-700 text-white border-gray-600 w-full"
                id="body"
                name="body"
                value={formData.body}
                onChange={changeHandler}
                placeholder="Write your email here"
                rows="5"
                required
              ></textarea>
            </div>
            {/* <div className="space-y-1">
            <label htmlFor="attachment" className="block text-sm font-medium text-gray-300">
              Attach File
            </label>
            <label htmlFor="attachment" className="btn btn-outline text-white border-gray-600">
              <MdAttachFile className="mr-2" /> Attach
            </label>
            <input type="file" id="attachment" name="attachment" className="hidden" />
          </div> */}
            <button disabled={isSubmitting} className={`btn btn-primary text-white w-full disabled:bg-opacity-100 disabled:cursor-not-allowed`} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Home;
