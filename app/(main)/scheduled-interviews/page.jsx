"use client"
import { useUser } from '@/app/provider'
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/superbaseClient'
import { Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_component/InterviewCard';

function ScheuduleInterview() {
    const { user } = useUser();
    const [ interviewList, SetInterviewList ] = useState();
    useEffect(() => {
        user && GetInterviewList();
    }, [user])
    const GetInterviewList = async () => {
        const result = await supabase.from('Interviews')
            .select('jobPosition, duration, interview_id, interview-feedback(userEmail)')
            .eq('userEmail', user?.email)
            .order('id', { ascending: false })

        console.log(result);
        SetInterviewList(result.data);

    }
    return (
        <div className=''>
            <h2 className='font-bold text-2xl'>Interview List With Candidate Feedback</h2>
            {interviewList?.length == 0 && (
                <div>
                    <div className='p-5 flex flex-col gap-3 items-center bg-white mt-5 rounded-xl'>
                        <Video className='text-primary' size={50} />
                        <h2>You Don't Have Any Interview Created!</h2>
                        <Button onClick={handleCreateNewInterview} className={'cursor-pointer'} >+ Create New Interview</Button>
                    </div>
                </div>
            )}
            {interviewList &&
                <div className='grid my-3 grid-cols-2 xl:grid-cols-3 gap-5'>
                    {interviewList.map((iv, index) => (
                        <InterviewCard interview={iv} key={index} viewDetail={true} />
                    ))}
                </div>


            }
        </div>
    )
}

export default ScheuduleInterview