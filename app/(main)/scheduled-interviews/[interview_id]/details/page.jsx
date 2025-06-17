"use client"
import { useUser } from '@/app/provider';
import { supabase } from '@/services/superbaseClient';
import { useParams } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import InterviewDetailContainer from './_components/InterviewDetailContainer';
import CandidateList from './_components/CandidateList';

function InterviewDetail() {
    const { interview_id } = useParams();
    const{ user } = useUser()
    const [interviewDetail,setInterviewDetail] = useState();

    useEffect(()=>{
        user&&GetInterviewDetail();

    },[user])

    const GetInterviewDetail =async () => {
        const result = await supabase.from('Interviews')
            .select(`jobPosition,jobDescription,type,questionList,created_at, duration, interview_id, interview-feedback(userEmail,userName,feedback,created_at)`)
            .eq('userEmail', user?.email)
            .eq('interview_id',interview_id)
           

            console.log(result);
            setInterviewDetail(result.data[0]);
    }

    return (
        <div>
            <h2 className='font-bold text-2xl'>Interview Details</h2>
            <InterviewDetailContainer interviewDetail={interviewDetail}/>
            <CandidateList candidateList={interviewDetail?.['interview-feedback']} />
        </div>
    )
}

export default InterviewDetail