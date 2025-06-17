"use client";
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import FormContainer from './_component/FormContainer';
import QuestionLIst from '../_component/QuestionLIst';
import { toast } from 'sonner';
import InterviewLink from './_component/InterviewLink';

function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({}); // Initialize as an empty object
  const totalSteps = 3; // Total number of steps
  const [interviewId,setInterviewId] = useState(null);

  const onHandelInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  const onGoToNext = () => {
    if (!formData || !formData.jobPosition || !formData.jobDescription || !formData.type) {
      toast.error("Please Fill All The Fields");
      return;
    } else {
      setStep(step + 1);
    }
  };

  const onCreateLink = (interview_id) => {
    setInterviewId(interview_id);
    setStep(step + 1);
  }



  return (
    <div className="px-10 md:px-24 lg:px-32 xl:px-56">
      <div className="flex items-center gap-2 mb-4">
        <ArrowLeft
          className="text-bold text-gray-500 cursor-pointer"
          onClick={() => router.back()}
        />
        <h2 className="font-bold text-2xl">Create New Interview</h2>
      </div>
      <Progress value={(step / totalSteps) * 100} className="my-5" />
      {step === 1 ? (
        <FormContainer
          onHandelInputChange={onHandelInputChange}
          GoToNext={onGoToNext}
        />
      ) : step === 2 ? (
        <QuestionLIst formData={formData} onCreateLink={(interview_id)=>onCreateLink(interview_id)}/>
      ) : step === 3 ? <InterviewLink interview_id={interviewId} formData={formData}/> : null}
    </div>
  );
}

export default CreateInterview;