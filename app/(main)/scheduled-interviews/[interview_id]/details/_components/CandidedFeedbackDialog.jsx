import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

import React from 'react'

function CandidedFeedbackDialog({ candidate }) {
    const onSend = () => {
        window.location.href = `mailto:${candidate?.userEmail}?subject=&body=`;
    };


    function getAverageRating(feedback) {
        const rating = feedback?.rating;
        if (!rating) return 0;

        const { techicalSkills = 0, communication = 0, problemSolving = 0, experince = 0 } = rating;

        const total = techicalSkills + communication + problemSolving + experince;
        const average = total / 4;

        return average.toFixed(1); // e.g., "7.5"
    }

    const feedback = candidate?.feedback?.feedback
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"outline"} className={"text-primary"}>View Report</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Feedback</DialogTitle>
                        <DialogDescription asChild>
                            <div className="mt-5">
                                <div className='flex justify-between items-center'>
                                    <div className='flex gap-5 items-center'>
                                        <div className='w-12 h-12 bg-primary text-white text-xl rounded-full flex items-center justify-center'>
                                            {candidate?.userName?.[0]?.toUpperCase() || '?'}
                                        </div>
                                        <div>
                                            <h2 className='font-bold'>{candidate?.userName}</h2>
                                            <h2 className='text-sm text-gray-500'>{candidate?.userEmail}</h2>
                                        </div>
                                    </div>
                                    <div className='gap-3 flex items-center'>
                                        <h2 className='text-primary text-2xl font-bold'>{getAverageRating(feedback)}/10</h2>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <h2 className="font-bold">Skills Assesment </h2>
                                    <div className="mt-3 grid grid-cols-2 gap-10">
                                        <div>
                                            <h2 className="flex justify-between">Technical Skills <span>{feedback?.rating?.techicalSkills}/10</span></h2>
                                            <Progress value={feedback?.rating?.techicalSkills * 10} className='mt-1' />
                                        </div>
                                        <div>
                                            <h2 className="flex justify-between">Communication <span>{feedback?.rating?.communication}/10</span></h2>
                                            <Progress value={feedback?.rating?.communication * 10} className='mt-1' />
                                        </div>
                                        <div>
                                            <h2 className="flex justify-between">Problem Solving <span>{feedback?.rating?.problemSolving}/10</span></h2>
                                            <Progress value={feedback?.rating?.problemSolving * 10} className='mt-1' />
                                        </div>
                                        <div>
                                            <h2 className="flex justify-between">Experience <span>{feedback?.rating?.experince}/10</span></h2>
                                            <Progress value={feedback?.rating?.experince * 10} className='mt-1' />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <h2 className="font-bold">Performance Summery</h2>
                                    <div className="p-5 bg-secondary my-3 rounded-md">
                                        <h2>{feedback?.summery}</h2>
                                    </div>

                                </div>
                                <div className="">
                                    <div className={` flex items-center mt-5 p-5 rounded-md ${feedback?.Recommendation == 'Recommended' ? 'bg-green-200' : 'bg-red-200'} `}>
                                        <div>
                                            <h2 className={`text-bold ${feedback?.Recommendation == 'Recommended' ? 'text-green-900' : 'text-red-900'} `}>{feedback?.Recommendation}</h2>
                                            <p className={`text-sm ${feedback?.Recommendation == 'Recommended' ? 'text-green-700' : 'text-red-700'} `}>{feedback?.RecommendationMsg}</p>
                                        </div>
                                        <Button
                                            className={`text-sm ${feedback?.Recommendation === 'Recommended'
                                                ? 'bg-green-700 hover:bg-green-700'
                                                : 'bg-red-700 hover:bg-red-700'}`}
                                            onClick={onSend}
                                        >
                                            Send Message
                                        </Button>

                                    </div>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CandidedFeedbackDialog