import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/superbaseClient";
import axios from "axios";
import { Loader2Icon, Trash2Icon, PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

function QuestionLIst({ formData, onCreateLink }) {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");

  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();
    const { error } = await supabase
      .from("Interviews")
      .insert([
        {
          ...formData,
          questionList: questions,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ]);

    setSaveLoading(false);

    if (error) {
      toast.error("Failed to save interview");
      return;
    }

    onCreateLink(interview_id);
  };

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });
      const content = result.data.data.content;
      const cleaned = content.replace("```json", "").replace("```", "");
      const parsed = JSON.parse(cleaned)?.interviewQuestions || [];
      setQuestions(parsed);
    } catch (e) {
      toast("Server Error, Please try again later!");
    } finally {
      setLoading(false);
    }
  };

  const addCustomQuestion = () => {
    if (!newQuestion.trim()) return;
    setQuestions((prev) => [
      ...prev,
      { question: newQuestion.trim(), type: "Custom" },
    ]);
    setNewQuestion("");
  };

  const deleteQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {loading && (
        <div className="p-4 bg-blue-50 rounded-lg shadow-md flex items-center gap-4 border border-blue-500">
          <Loader2Icon className="animate-spin text-blue-600" size={32} />
          <div>
            <h2 className="font-semibold text-blue-700 text-lg">
              Generating Interview Questions
            </h2>
            <p className="text-sm text-blue-600">
              Our AI is crafting personalized questions based on your job
              description.
            </p>
          </div>
        </div>
      )}

      {questions?.length > 0 && (
        <div>
          <h2 className="font-bold text-lg mb-4">Generated Interview Questions</h2>
          <div className="space-y-4">
            {questions.map((item, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white relative flex justify-between items-start"
              >
                <div>
                  <p className="font-medium">{item.question}</p>
                  <span className="text-sm text-gray-500">
                    Type: {item?.type}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:bg-red-100"
                  onClick={() => deleteQuestion(index)}
                >
                  <Trash2Icon size={18} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Question Input */}
      <div className="flex flex-col  sm:flex-row items-center gap-3">
        <input
          type="text"
          placeholder="Add Custom Question..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="flex-1 bg-white px-4 py-2 border rounded-md shadow-sm border-gray-300 w-full"
        />
        <Button
          onClick={addCustomQuestion}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
        >
          <PlusIcon size={18} />
          Add
        </Button>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={onFinish}
          disabled={saveLoading}
          className="bg-primary text-white hover:bg-primary/80 flex items-center gap-2"
        >
          {saveLoading && <Loader2Icon className="animate-spin" size={18} />}
          Create Interview Link & Finish
        </Button>
      </div>
    </div>
  );
}

export default QuestionLIst;
