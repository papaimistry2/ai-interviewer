"use client";
import { UserDetailContext } from "@/conext/UserDetailContext";
import { supabase } from "@/services/superbaseClient";
import { User } from "lucide-react";
import React, { useEffect, useState } from "react";

const Provider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    console.log("Calling CreateNewUser...");
    CreateNewUser();
  }, []);

  const CreateNewUser = () => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      //if present
      let { data: Users, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user?.email);
      console.log(Users);

      if (Users.length === 0) {
        const { data, error } = await supabase.from("Users").insert([
          {
            name: user?.user_metadata?.name,
            email: user?.email,
            picture: user?.user_metadata?.picture,
          },
        ]);
        console.log(data);
        setUser(data);
        return;
      }
      setUser(Users[0]);
    });
  }; // Close the CreateNewUser function

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
};

export default Provider;

export const useUser=()=>{
    const context=React.useContext(UserDetailContext)
    if(!context){
        throw new Error('useUser must be used within a UserDetailProvider')
    }
    return context
}
