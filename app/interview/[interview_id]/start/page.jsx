"use client";
import { InterviewDataContext } from "@/conext/InterviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_component/AlertConfirmation";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/services/superbaseClient";
import { useParams, useRouter } from "next/navigation";

function StartInterview() {
  const [interviewInfo, setInterviewInfo] = useContext(InterviewDataContext);
  const vapiRef = useRef(null); // Use a ref to persist the Vapi instance
  const [activeUser, setActiveUser] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // Timer state
  const timerRef = useRef(null); // Ref to store the timer interval
  const [isCallActive, setIsCallActive] = useState(false); // Track call state
  const [conversation, setConversation] = useState([]); // Store conversation messages
  const conversationRef = useRef([]);
  const { interview_id } = useParams();
  const route =useRouter();
  // Get the maximum duration from the interview info (in seconds)
  const maxDuration = interviewInfo?.interviewData?.duration || 0; // Example: duration in seconds

  // Event listener functions
  const handleCallStart = () => {
    console.log("Call has started.");
    toast("Call has Connected...");
    setIsCallActive(true); // Mark the call as active
    startTimer(); // Start the timer when the call starts
  };

  const handleSpeechStart = () => {
    console.log("Assistant speech has started.");
    setActiveUser(false);
  };

  const handleSpeechEnd = () => {
    console.log("Assistant speech has ended.");
    setActiveUser(true);
  };

  const handleCallEnd = () => {
    console.log("Call has ended. Final conversation:", conversationRef.current);
    toast("Interview has Ended...");
    route.push('/interview/completed')

    // Use the ref value which is always current
    if (conversationRef.current.length > 0) {
      GenerateFeedback();
    } else {
      console.warn("No conversation recorded during call");
      toast.error("No conversation was recorded during the interview");
    }

    setIsCallActive(false);
    stopTimer();
  };

  const handleMessage = (message) => {
    if (message?.conversation) {
      console.log("New conversation update:", message.conversation);
      setConversation(prev => {
        const updated = [...(prev || []), ...message.conversation];
        conversationRef.current = updated; // Keep ref in sync
        return updated;
      });
    }
  };

  const GenerateFeedback = async () => {
    try {
      const currentConversation = conversationRef.current;

      if (!currentConversation || currentConversation.length === 0) {
        console.warn("No conversation data available for feedback");
        toast.error("No conversation recorded to generate feedback");
        return;
      }

      console.log("Generating feedback with conversation:", currentConversation);
      const result = await axios.post("/api/ai-feedback", {
        conversation: currentConversation,
      });

      const Content = result.data.data.content;
      const FINAL_CONTENT = Content.replace("```json", "").replace("```", "");
      console.log("Feedback content:", FINAL_CONTENT);

      const { data, error } = await supabase
        .from('interview-feedback')
        .insert([
          {
            userName: interviewInfo?.userName,
            userEmail: interviewInfo?.userEmail,
            interview_id: interview_id,
            feedback: JSON.parse(FINAL_CONTENT),
            recommended: false,
          },
        ])
        .select()
        console.log(data);

    } catch (error) {
      console.error("Error generating feedback:", error);
      toast.error("Failed to generate feedback. Please try again.");
    }
  };

  useEffect(() => {
    if (interviewInfo) {
      initializeVapi();
      startCall();
    }
    return () => {
      stopTimer();
      cleanupVapi();
    };
  }, [interviewInfo]);

  const initializeVapi = () => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    }
  };

  const startCall = () => {
    let questionList = "";
    interviewInfo?.interviewData?.questionList.forEach((item) => {
      questionList = item?.question + "," + questionList;
    });
    console.log(questionList);

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage:
        "Hi " +
        interviewInfo?.userName +
        ", how are you? Ready for your interview on " +
        interviewInfo?.interviewData?.jobPosition,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              `
    You are an AI voice assistant conducting interviews.
    Your job is to ask candidates provided interview questions, assess their responses.
    Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
    "Hey there! Welcome to your ` +
              interviewInfo?.interviewData?.jobPosition +
              ` interview. Let’s get started with a few questions!"
    Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below are the questions ask one by one:
    Questions: ` +
              questionList +
              `
    If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
    "Need a hint? Think about how React tracks component updates!"
    Provide brief, encouraging feedback after each answer. Example:
    "Nice! That’s a solid answer."
    "Hmm, not quite! Want to try again?"
    Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
    After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
    "That was great! You handled some tough questions well. Keep sharpening your skills!"
    End on a positive note:
    "Thanks for chatting! Hope to see you crushing projects soon!"
    Key Guidelines:
    ✅ Be friendly, engaging, and witty
    ✅ Keep responses short and natural, like a real conversation
    ✅ Adapt based on the candidate’s confidence level
    ✅ Ensure the interview remains focused on React
    `.trim(),
          },
        ],
      },
    };

    vapiRef.current.start(assistantOptions);

    // Attach event listeners
    vapiRef.current.on("call-start", handleCallStart);
    vapiRef.current.on("speech-start", handleSpeechStart);
    vapiRef.current.on("speech-end", handleSpeechEnd);
    vapiRef.current.on("call-end", handleCallEnd);
    vapiRef.current.on("message", handleMessage);
  };

  const stopInterview = () => {
    try {
      console.log("Stopping the interview...");
      if (vapiRef.current) {
        vapiRef.current.stop();
        cleanupVapi();
        stopTimer(); // Stop the timer when the interview is manually ended
        setIsCallActive(false); // Mark the call as inactive
      } else {
        console.error("Vapi instance is not available.");
      }
    } catch (error) {
      console.error("Error stopping the interview:", error);
      toast.error("Failed to stop the interview. Please try again.");
    }
  };

  const cleanupVapi = () => {
    if (vapiRef.current) {
      // Save conversation before removing listeners
      const finalConversation = conversationRef.current;
      console.log("Saving final conversation before cleanup:", finalConversation);

      vapiRef.current.off("call-start", handleCallStart);
      vapiRef.current.off("speech-start", handleSpeechStart);
      vapiRef.current.off("speech-end", handleSpeechEnd);
      vapiRef.current.off("call-end", handleCallEnd);
      vapiRef.current.off("message", handleMessage);

      // Optionally save to storage if needed
      // localStorage.setItem('lastConversation', JSON.stringify(finalConversation));
    }
  };

  const startTimer = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Start a new timer
    timerRef.current = setInterval(() => {
      setElapsedTime((prevTime) => {
        if (prevTime + 1 >= maxDuration) {
          stopInterview(); // Automatically stop the interview when max duration is reached
          return maxDuration; // Ensure the timer doesn't exceed max duration
        }
        return prevTime + 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-20 lg:px-48 xl:px-56 bg-blue-50 pb-16">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          {formatTime(elapsedTime)}
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-10">
        <div className="bg-white h-[400px] rounded-lg border items-center justify-center flex flex-col gap-5">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping">
                {" "}
              </span>
            )}
            <Image
              src={"/ai.jpg"}
              alt="ai"
              height={100}
              width={100}
              className="rounded-full object-cover"
            />
          </div>
          <h2>AI Recruiter</h2>
        </div>
        <div className="bg-white h-[400px] rounded-lg border items-center justify-center flex flex-col gap-5">
          <div className="relative flex items-center justify-center">
            {activeUser && (
              <span className="absolute w-25 h-25 rounded-full bg-blue-500 opacity-75 animate-ping"></span>
            )}
            <div className="w-19 h-19 flex items-center justify-center rounded-full bg-primary text-white text-2xl m-3">
              {interviewInfo?.userName[0]}
            </div>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>
      <div className="flex gap-5 mt-10 justify-center items-center">
        <Mic className="h-15 w-15 p-3 bg-gray-500 rounded-full text-white border cursor-pointer" />
        <AlertConfirmation stopInterview={() => stopInterview()}>
          <Phone className="h-15 w-15 p-3  rounded-full text-white bg-red-500 border cursor-pointer" />
        </AlertConfirmation>
      </div>
      <h2 className="text-sm text-gray-400 text-center mt-5">
        {isCallActive ? "Interview Is In Progress..." : "Interview Has Ended."}
      </h2>
    </div>
  );
}

export default StartInterview;
