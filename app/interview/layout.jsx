'use client';
import React, { useState } from 'react'
import InterviewHeader from './_components/InterviewHeader'
import { InterviewDataContext } from '@/conext/InterviewDataContext'

function InterviewLayout({children}) {
    const [interviewInfo, setInterviewInfo] = useState();
  return (
    <InterviewDataContext.Provider value={[interviewInfo, setInterviewInfo]}>
    <div className=''>
        <InterviewHeader/>
        {children}
    </div>
    </InterviewDataContext.Provider>
  )
}

export default InterviewLayout