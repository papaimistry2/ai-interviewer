import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/AppSidebar";
import WelcomeContainer from "./dashboard/_component/WelcomeContainer";

function DashboaedProvider({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className=" w-full" >
        {/* <SidebarTrigger /> */}
        <div className="pl-10 pr-10 pt-10">
        <WelcomeContainer/>
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
}

export default DashboaedProvider;
