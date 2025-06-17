"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const goLogin = () => {
    router.push('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="px-6 md:px-16 py-20 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Smarter Hiring with <span className="text-blue-600">AI Interviews</span>
            </h1>
            <p className="text-lg text-gray-600">
              Conduct structured interviews, evaluate responses instantly, and find the right candidate faster. Built for HR professionals and recruiters.
            </p>
            <div className="flex gap-4">
              <Button onClick={goLogin} className="text-white bg-blue-600 hover:bg-blue-700">Start Hiring</Button>
            </div>
          </div>
          <div className="flex-1">
            <Image
              src="/homeAi.jpeg"
              alt="AI Interview"
              width={500}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-bold">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">AI-Powered Candidate Evaluation</h3>
              <p>Analyze candidate responses in real-time to make data-driven hiring decisions.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">Custom Interview Templates</h3>
              <p>Create question sets based on job roles, experience levels, and skill requirements.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">Candidate Insights Dashboard</h3>
              <p>Track interview progress, compare candidates, and streamline your hiring pipeline.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Streamline Your Interview Process</h2>
        <p className="mb-6 text-lg">Let AI help you find the best talent — faster and smarter.</p>
        <Button onClick={goLogin} className="bg-white text-blue-600 hover:bg-gray-100">Get Started</Button>
      </section>
    </div>
  );
}
