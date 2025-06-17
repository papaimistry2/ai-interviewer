"use client";
import { useUser } from "@/app/provider";
import Image from "next/image";
import React from "react";

function WelcomeContainer() {
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center bg-white p-5 rounded-xl w-full">
      <div >
        <h2 className="text-lg font-bold">Welcome , {user?.name}</h2>
        <h2 className="text-gray-600">AI-Driven InterViews</h2>
      </div>
      {user&&<Image src={user?.picture} alt="useravatar" width={50} height={50} className="rounded-full"/>}
    </div>
  );
}

export default WelcomeContainer;
