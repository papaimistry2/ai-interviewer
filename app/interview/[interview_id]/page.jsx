"use client";
import React, { useContext, useEffect, useState } from "react";
import InterviewHeader from "../_components/InterviewHeader";
import Image from "next/image";
import { Clock, Info, Loader2Icon, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/services/superbaseClient";
import { toast } from "sonner";
import { InterviewDataContext } from "@/conext/InterviewDataContext";

function Interview() {
  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState();
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [interviewInfo, setInterviewInfo] = useContext(InterviewDataContext);
  const route = useRouter();

  useEffect(() => {
    interview_id && GetInterviewDetails();
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      let { data: Interviews, error } = await supabase
        .from("Interviews")
        .select("jobPosition, jobDescription, duration, type")
        .eq("interview_id", interview_id);
      setInterviewData(Interviews[0]);
      setLoading(false);
      if (Interviews.length === 0) {
        toast("Incorrect Interview ID");
      }
    } catch (e) {
      setLoading(false);
      toast("Error fetching interview details");
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (event) => {
    const email = event.target.value;
    setUserEmail(email);
    setIsValid(validateEmail(email));
  };

  const onJoinInterview = async () => {
    setLoading(true);
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("interview_id", interview_id);

    setInterviewInfo({
      userName: userName,
      userEmail: userEmail,
      interviewData: Interviews[0],
    });

    setLoading(false);
    route.push("/interview/" + interview_id + "/start");
  };

  return (
    <div className="px-10 md:px-28 lg:px-48 xl:pz-64 mt-16">
      <div className="flex flex-col items-center justify-center p-7 bg-white border rounded-lg shadow-md lg:px-33 xl:px-52 mb-30">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={200}
          height={100}
          className="w-[150px]"
        />
        <h2>AI-Powered Interview Platform</h2>
        <Image
          src={"/interview.png"}
          alt="interview"
          width={200}
          height={100}
          className="w-[350px]"
        />
        <h2 className="font-bold text-lg">{interviewData?.jobPosition}</h2>
        <h2 className="flex gap-2 items-center text-gray-500">
          <Clock className="h-4 w-4" />
          {interviewData?.duration}
        </h2>

        <div className="w-full mt-4">
          <h2>Enter Your Full Name</h2>
          <Input
            type="text"
            placeholder="Full Name"
            className="w-full mt-2"
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>

        <div className="w-full mt-4">
          <h2>Enter Your Email</h2>
          <input
            type="email"
            placeholder="Email"
            value={userEmail}
            onChange={handleChange}
            className={`w-full mt-2 border rounded px-2 py-1 ${
              isValid ? "border-gray-300" : "border-red-500"
            }`}
          />
          {!isValid && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a valid email address.
            </p>
          )}
        </div>

        <div className="w-full mt-4 bg-blue-100 p-4 rounded-lg flex gap-10 items-center justify-start">
          <Info className="h-7 w-7 text-primary ml-5" />
          <div>
            <h2 className="font-bold">Before You Begin</h2>
            <ul>
              <li className="text-sm text-primary">
                - Test Your Camera And Microphone.
              </li>
              <li className="text-sm text-primary">
                - Ensure You Have Stable Internet Connection.
              </li>
              <li className="text-sm text-primary">
                - Find A Quiet Place For Interview.
              </li>
            </ul>
          </div>
        </div>

        <Button
          className={"mt-5 w-full font-bold"}
          disabled={loading || !userName || !userEmail || !isValid}
          onClick={() => onJoinInterview()}
        >
          <Video />
          {loading && <Loader2Icon className="animate-spin ml-2" />}
          Join Interview
        </Button>
      </div>
    </div>
  );
}

export default Interview;
