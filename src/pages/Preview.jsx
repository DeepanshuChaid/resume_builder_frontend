import api from "../configs/api"
import { useParams, Link } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ResumePreview from "../components/ResumePreview";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Preview() {
  const { resumeid } = useParams();

  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadResume() {
    try {
      
    const {data} = await api.get(`/api/resumes/public/${resumeid}`)
    setResumeData(data.resume)
    } catch (error) {
      toast.error("Error loading resume");
    } finally {
      setLoading(false);  
    }
  }

  useEffect(() => {
    loadResume();
  }, []);

  if (loading) return <Loader />;

  return resumeData ? (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-12">
        <ResumePreview
          classes="py-4 bg-white"
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <p className="text-lg mb-4">Resume Not Found</p>
      <Link
        to="/app"
        className="mt-2 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 flex items-center gap-2 transition-colors ring-1 ring-green-400"
      >
        <ArrowLeftIcon className="size-4" /> Go Back to Dashboard
      </Link>
    </div>
  );
}
