import { Button } from '@/components/ui/button';
import moment from 'moment';
import React from 'react'
import CandidedFeedbackDialog from './CandidedFeedbackDialog';

function CandidateList({ candidateList }) {
    if (!candidateList || !Array.isArray(candidateList)) return null;

    return (
        <div className=''>
            <h2 className='font-bold my-5'>Candidates ({candidateList.length})</h2>
            {candidateList.map((candidate, index) => (
                <div key={index} className='flex items-center mt-2 gap-3 p-5 bg-white rounded-lg justify-between'>
                    <div className='flex gap-5 items-center'>
                        <div className='w-12 h-12 bg-primary text-white text-xl rounded-full flex items-center justify-center'>
                            {candidate?.userName?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div>
                            <h2 className='font-bold'>{candidate?.userName}</h2>
                            <h2 className='text-sm text-gray-500'>Completed On: {moment(candidate?.created_at).format('DD MMM YYYY')}</h2>
                        </div>
                    </div>
                    <div className='gap-3 flex items-center'>
                        <CandidedFeedbackDialog candidate={candidate} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CandidateList
