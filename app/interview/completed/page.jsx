"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

function Completed() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white p-10 rounded-xl shadow-md text-center space-y-6 max-w-md">
        <CheckCircle className="mx-auto text-green-500 w-16 h-16" />
        <h1 className="text-3xl font-bold text-gray-800">Interview Completed</h1>
        <p className="text-gray-600">
          Thank you for completing the interview. You can now review the candidate’s performance or return to your dashboard.
        </p>
        <div className="w-full rounded-md p-6 bg-blue-600 text-white ">
          Thank You
        </div>
      </div>
    </div>
  );
}

export default Completed;
