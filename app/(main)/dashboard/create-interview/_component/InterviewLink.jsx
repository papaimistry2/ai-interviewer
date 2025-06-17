import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Clock, Copy, Mail, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

function InterviewLink({ interview_id, formData }) {
  const GetInterviewUrl = () => {
    const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview_id;
    if (!process.env.NEXT_PUBLIC_HOST_URL) {
      throw new Error("Host URL is not defined in environment variables.");
    }
    return url;
  };

  const onCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(GetInterviewUrl());
      toast("Link Copied To Clipboard");
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast.error("Failed to copy link. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={"/check.png"}
        alt="check"
        width={100}
        height={100}
        className="mx-auto mb-5"
      />
      <h2 className="text-center text-2xl font-bold">
        Your Interview Link is Ready
      </h2>
      <p className="mt-3">Share This Link With Your Candidates To Start The Interview Process</p>
      <div className="w-full p-7 mt-6 rounded-xl bg-white">
        <div className="flex items-center justify-between items-center">
          <h2 className="font-bold">Interview Link</h2>
          <h2 className="p-1 px-2 text-primary bg-blue-50 rounded-xl">Valid For 30 Days</h2>
        </div>
        <div className="mt-3 flex gap-3 items-center justify-between">
          <Input defaultValue={GetInterviewUrl()} disabled={true} />
          <Button onClick={() => onCopyLink()}><Copy />Copy Link</Button>
        </div>
        <hr className="my-5" />
        <div>
          <div>
            <h2 className="text-sm text-gray-500 flex gap-2 items-center"><Clock className="h-4 w-4" />{formData?.duration}</h2>
          </div>
        </div>
      </div>
      <div className="mt-7 bg-white p-5 rounded-lg w-full">
        <h2 className="font-bold">Share Via</h2>
        <div className="flex gap-7 mt-2 justify-around items-center">
          <Button variant={'outline'} className={'bg-white '}><Mail />Email</Button>
          <Button variant={'outline'} className={'bg-white '}><Mail />Whatsapp</Button>
          <Button variant={'outline'} className={'bg-white '}><Mail />Slack</Button>
        </div>
      </div>
      <div className="flex w-full gap-5 mt-6 items-center justify-between">
        <Link href={'/dashboard'}>
          <Button variant={'outline'} className={'bg-white'}><ArrowLeft />Back To Dashboard</Button>
        </Link>
        <Link href={'/dashboard/create-interview'}>
          <Button><Plus />Create New Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewLink;