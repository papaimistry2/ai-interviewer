"use client";
import { Button } from '@/components/ui/button';
import { Camera, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/provider';
import { supabase } from '@/services/superbaseClient';
import { toast } from 'sonner';
import InterviewCard from '../dashboard/_component/InterviewCard';

function AllInterview() {
  const [interviewList, setInterviewList] = useState([]);
  const {user}=useUser();
  useEffect(()=>{
    user && GetInterviewList();

  },[user])

  const GetInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select('*')
      .eq('userEmail',user?.email)
      .order('id',{ascending:false})

    console.log(Interviews);
    setInterviewList(Interviews);

  }

  const router = useRouter();

  const handleCreateNewInterview = () => {
    router.push('/dashboard/create-interview');
  };

  

  return (
    <div className='my-3'>
      <h2 className='font-bold text-2xl'>Previously Created Interview</h2>
      {interviewList?.length == 0 && (
        <div>
          <div className='p-5 flex flex-col gap-3 items-center bg-white mt-5 rounded-xl'>
            <Video className='text-primary' size={50} />
            <h2>You Don't Have Any Interview Created!</h2>
            <Button onClick={handleCreateNewInterview} className={'cursor-pointer'} >+ Create New Interview</Button>
          </div>
        </div>
      )}
      {interviewList&&
        <div  className='grid my-3 grid-cols-2 xl:grid-cols-3 gap-5'>
          {interviewList.map((iv,index)=>(
            <InterviewCard interview={iv} key={index}/>
          ))}
        </div>
      
      
      }
    </div>
  );
}

export default AllInterview