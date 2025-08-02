"use client"
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/superbaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";


function Login() {
  const router = useRouter()


  const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        prompt: 'select_account',
      },
      redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
    },
  });

  if (error) {
    console.error('Error signing in with Google:', error.message);
  }
};




  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="flex flex-col items-center border rounded-2xl p-8">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={500}
          height={100}
          className="w-[300px] "
        />
        <div className="flex flex-col items-center">
          <Image
            src={"/login.jpg"}
            alt="login"
            width={600}
            height={400}
            className="w-[400px] h-[250px] rounded-2xl"
          />
          <h2 className="text-2xl font-bold text-center">Welcome To AI-Interviewer</h2>
          <p className="text-gray-500 text-center">Sign In With Google Authentication</p>
          <Button className="mt-5 w-full"
            onClick={signInWithGoogle}
          >Login With Google</Button>
        </div>
      </div>

    </div>
  );
}

export default Login;
