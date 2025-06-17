import {
  BriefcaseBusinessIcon,
  Calendar,
  Code2Icon,
  LayoutDashboard,
  List,
  Puzzle,
  SettingsIcon,
  Speech,
  User2Icon,
  WalletCards,
} from "lucide-react";

export const SideBarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Scheduled Interviews",
    icon: Calendar,
    path: "/scheduled-interviews",
  },
  {
    name: "All Interviews",
    icon: List,
    path: "/all-interviews",
  },
  {
    name: "Settings",
    icon: SettingsIcon,
    path: "/settings",
  },
];
export const InterviewType = [
  {
    tittle: "Technical",
    icon: Code2Icon,
  },
  {
    tittle: "Behavioral",
    icon: User2Icon,
  },
  {
    tittle: "Experience",
    icon: BriefcaseBusinessIcon,
  },
  {
    tittle: "Problem Solving",
    icon: Puzzle,
  },
  {
    tittle: "Leadership",
    icon: Speech,
  },
];

export const QUESTIONS_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

### Instructions:
1. Analyze the job description to identify:
   - Key responsibilities
   - Required technical skills
   - Necessary soft skills
   - Expected experience level

2. Generate questions that:
   - Match the interview duration (adjust quantity/depth accordingly)
   - Are appropriate for a {{type}} interview format
   - Cover all relevant competency areas

3. Question types should include:
   - Technical/Skill-based
   - Behavioral
   - Experience-based
   - Problem-solving
   - Leadership/Teamwork (for appropriate levels)
   - Situational/Case-based (if applicable)

### Output Requirements:
- Format response as valid JSON
- Structure questions to flow logically (e.g., warm-up → technical → behavioral → closing)
- Include estimated time allocation per question based on duration

### Output Format:
{
  "interviewQuestions": [
    {
      "question": "",
      "type": "Technical|Behavioral|Experience|Problem Solving|Leadership"
    },
    ...
  ],
  "totalEstimatedTime": "{{duration}}",
  "interviewStructureNotes": ""
}

### Goals:
1. Create a time-optimized interview plan for {{jobTitle}}
2. Ensure questions are relevant and actionable
3. Maintain professional tone appropriate for {{type}} interview`;

export const FEEDBACK_PROMPT = `
{{conversation}}
Depends on this Interview Conversation between assitant and user, 
Give me feedback for user interview. Give me rating out of 10 for techical Skills, 
Communication, Problem Solving, Experince. Also give me summery in 3 lines 
about the interview and one line to let me know whether is recommanded 
for hire or not with msg. Give me response in JSON format
{
    feedback:{
        rating:{
            techicalSkills:<0 to 10>,
            communication:<0 to 10>,
            problemSolving:<0 to 10>,
            experince:<0 to 10>
        },
        summery:<in 3 Line>,
        Recommendation:"<Recommended/Not Recommended>",
        RecommendationMsg:""
    }
}
`;
