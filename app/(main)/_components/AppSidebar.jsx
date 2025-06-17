"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SideBarOptions } from "@/services/Constants";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { use } from "react";

export function AppSidebar() {
  const path = usePathname();
  console.log(path);

  const router = useRouter(); 

  const handleCreateNewInterview = () => {
    router.push('/dashboard/create-interview'); 
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center mt-5">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={200}
          height={100}
          className="w-[200px]"
        />
        <Button onClick={handleCreateNewInterview} className="w-full mt-4">
          <Plus />
          Create New Interview
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SideBarOptions.map((option, index) => (
                <SidebarMenuItem key={index} className={`p-2  ${path==option.path&&'bg-blue-100 rounded-[7px]'}`  }>
                  <SidebarMenuButton asChild>
                    <Link href={option.path}>
                      <div className="flex items-center">
                        <option.icon className={`mr-5 ${path==option.path&&'text-primary '}`  }/>
                        <span className={`text-[16px] font-medium  ${path==option.path&&'text-primary  '}`  }>{option.name}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
