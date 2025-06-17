import { Button } from '@/components/ui/button'
import { ArrowRight, Copy, Ghost, Send } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function InterviewCard({ interview ,viewDetail }) {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id
    const copyLink = () => {
        navigator.clipboard.writeText(url);
        toast('Copied');
    }

    const onSend = () => {
        window.location.href = "mailto:papaimistry01@gmail.com?subject=AI%20Interviewer%20Interview%20Link&body=Interview%20Link:"+url;
    };



    return (
        <div className='p-5 bg-white rounded-lg border'>
            <div className='flex items-center justify-between'>
                <div className='h-[40px] w-[40px] bg-primary rounded-full'></div>
                <h2 className='text-sm '>{moment(interview?.created_at).format('Do MMM YYYY')}</h2>

            </div>
            <h2 className='mt-3 front-bold text-lg'>{interview?.jobPosition}</h2>
            <h2 className='mt-2 text-sm flex justify-between '>{interview?.duration}
                <span className='text-green-700'>{interview['interview-feedback']?.length} Candidates</span>
            </h2>
            {!viewDetail? <div className='flex gap-3 mt-5 justify-between'>
                <Button variant={'outline'} onClick={copyLink}><Copy /> Copy Link</Button>
                <Button onClick={onSend} ><Send /> Send</Button>
            </div>
            :
            <Link href={'/scheduled-interviews/'+interview?.interview_id+"/details"}>
            <Button variant={'outline'} className={'mt-5 w-full'}>View Detail<ArrowRight/></Button>
            </Link>
            }
            
        </div>
    )
}

export default InterviewCard