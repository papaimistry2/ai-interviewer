import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { InterviewType } from "@/services/Constants";
import { Button } from "@/components/ui/button";

function FormContainer({ onHandelInputChange , GoToNext }) {
  const [interviewType, setInterviewType] = React.useState([]);

  // Function to add or remove interview types
  const AddInterviewType = (type) => {
    if (interviewType.includes(type)) {
      // Remove the type if it already exists
      setInterviewType((prev) => prev.filter((item) => item !== type));
    } else {
      // Add the type if it doesn't exist
      setInterviewType((prev) => [...prev, type]);
    }
  };

  // Update the parent component whenever interviewType changes
  useEffect(() => {
    onHandelInputChange("type", interviewType);
  }, [interviewType]);

  return (
    <div className="p-5 bg-white rounded-xl">
      {/* Job Position */}
      <div>
        <h2 className="text-medium">Job Position</h2>
        <Input
          placeholder="e.g. Full Stack Developer"
          className="mt-2"
          onChange={(event) =>
            onHandelInputChange("jobPosition", event.target.value)
          }
        />
      </div>

      {/* Job Description */}
      <div className="mt-5">
        <h2 className="text-medium">Job Description</h2>
        <Textarea
          placeholder="Enter Job Description"
          className="mt-2 h-[200px]"
          onChange={(event) =>
            onHandelInputChange("jobDescription", event.target.value)
          }
        />
      </div>

      {/* Interview Duration */}
      <div className="mt-5">
        <h2 className="text-medium">Interview Duration</h2>
        <Select
          onValueChange={(value) => onHandelInputChange("duration", value)}
        >
          <SelectTrigger className="w-[180px] mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 Min">5 Min</SelectItem>
            <SelectItem value="15 Min">15 Min</SelectItem>
            <SelectItem value="30 Min">30 Min</SelectItem>
            <SelectItem value="45 Min">45 Min</SelectItem>
            <SelectItem value="60 Min">60 Min</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Interview Type */}
      <div className="mt-5">
        <h2 className="text-medium">Interview Type</h2>
        <div className="flex gap-3 items-center flex-wrap mt-2">
          {InterviewType.map((type, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 border border-gray-200 rounded-lg p-2 cursor-pointer hover:shadow-md transition-all duration-200 ${
                interviewType.includes(type.tittle)
                  ? "bg-blue-50 text-primary"
                  : ""
              }`}
              onClick={() => AddInterviewType(type.tittle)}
            >
              <type.icon />
              <span>{type.tittle}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Question Button */}
      <div className="flex items-center justify-end mt-5" onClick={()=>GoToNext()}>
        <Button >
          Generate Question <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default FormContainer;