
import React from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import api from "../configs/api";

export default function ProfessionalSummaryForm({ data, onChange, setResumeData }) {
  const { token } = useSelector(state => state.auth);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);
      // Make sure data is a string or stringify object
      const prompt = `Enhance my professional summary based on this data: ${
        typeof data === "string" ? data : JSON.stringify(data)
      }`;

      const response = await api.post(
        "/api/ai/enhance-professional-summary",
        { userContent: prompt },
        { headers: { Authorization: `Bearer ${token}` } } // Add Bearer
      );

      // Safely get the enhanced summary
      const enhanced = response.data.enhancedContent || response.data.enhancedSummary || response.data.content;

      if (!enhanced) {
        toast.error("No enhanced summary returned from AI.");
        return;
      }

      setResumeData(prev => ({ ...prev, professional_summary: enhanced }));
    } catch (error) {
      console.log("AI Enhancement Error:", error.response || error);
      toast.error(error.response?.data?.message || error.message || "Enhancement failed");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add summary for your resume here.
          </p>
        </div>

        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <div className="mt-6">
        <textarea
          className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Write your professional summary here..."
          name="professionalSummary"
          id="professionalSummary"
          rows={7}
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
        />
        <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center">
          Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.
        </p>
      </div>
    </div>
  );
}
