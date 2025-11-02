import SkillsForm from "../components/SkillsForm";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  FolderIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Share2Icon,
  EyeIcon,
  EyeOffIcon,
  DownloadIcon,
} from "lucide-react";
import { toast } from "react-hot-toast";

import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import { useSelector } from "react-redux";
import api from "../configs/api";

export default function ResumeBuilder() {
  const { resumeid } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [resume, setResume] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experiences: [], // <-- use plural keys to match backend
    educations: [], // <-- backend uses educations
    skills: [],
    projects: [],
    template: "classic",
    accent_color: "#3b82f6",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal_info", name: "Personal Info", icon: User },
    { id: "summary", name: "Professional Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { data } = await api.get(`/api/resumes/get/${resumeid}`, {
          headers: { Authorization: token },
        });

        if (data.resume) {
          // Use backend field names (plural) and safely fallback to arrays
          setResume((prev) => ({
            ...prev,
            ...data.resume,
            experiences: data.resume.experiences || [],
            educations: data.resume.educations || [],
            projects: data.resume.projects || [],
            skills: data.resume.skills || [],
          }));
          document.title = data.resume.title;
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    if (token && resumeid) fetchResume();
  }, [resumeid, token]);

  // toggle public/private
  async function changeResumeVisibility() {
    try {
      const formData = new FormData();
      formData.append("resume", JSON.stringify({ public: !resume.public }));

      const { data } = await api.put(
        `/api/resumes/update/${resumeid}`,
        formData,
        {
          headers: { Authorization: token },
        },
      );

      setResume((prev) => ({ ...prev, public: !prev.public }));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  const save = async () => {
    try {
      // extract image file if user selected a File
      let imageFile = null;
      if (resume.personal_info?.image instanceof File) {
        imageFile = resume.personal_info.image;
      }

      // sanitize: remove File/Blob objects for JSON part, but keep everything else
      const sanitizeResume = (data) => {
        if (data === null || data === undefined) return data;
        if (typeof data !== "object") return data;
        if (data instanceof File || data instanceof Blob) return null;
        if (Array.isArray(data)) {
          return data.map((item) => sanitizeResume(item));
        }
        const result = {};
        for (const key in data) {
          if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
          const sanitized = sanitizeResume(data[key]);
          // include keys even if sanitized is empty array/object; only skip File/Blob -> null
          if (sanitized !== null) result[key] = sanitized;
        }
        return result;
      };

      const resumeToSave = sanitizeResume(resume);

      const formData = new FormData();
      formData.append("resume", JSON.stringify(resumeToSave));

      if (removeBackground) formData.append("removeBackground", "true");
      if (imageFile) formData.append("image", imageFile);

      const { data } = await api.put(
        `/api/resumes/update/${resumeid}`,
        formData,
        {
          headers: { Authorization: token },
        },
      );

      // Merge authoritative backend response, but ensure arrays fall back correctly
      setResume((prev) => ({
        ...prev,
        ...data.resume,
        experiences: data.resume.experiences || prev.experiences || [],
        educations: data.resume.educations || prev.educations || [],
        projects: data.resume.projects || prev.projects || [],
        skills: data.resume.skills || prev.skills || [],
        personal_info: {
          ...prev.personal_info,
          ...(data.resume.personal_info || {}),
          // keep local File object if user still has it selected, otherwise use server url
          image:
            prev.personal_info?.image instanceof File
              ? prev.personal_info.image
              : data.resume.personal_info?.image || prev.personal_info?.image,
        },
      }));

      toast.success(data.message);
    } catch (error) {
      console.error("Save error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Save failed - check console",
      );
    }
  };

  function handleShare() {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = `${frontendUrl}/view/${resumeid}`;
    if (navigator.share) {
      navigator.share({
        url: resumeUrl,
        text: "Check out my Resume!",
        title: "My Resume",
      });
    } else {
      alert("Sharing is not supported in your browser");
    }
  }

  function downloadResume() {
    window.print();
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to="/app" className="flex items-center gap-2">
          <ArrowLeftIcon className="w-6 h-6 text-slate-600 hover:text-slate-800 transition-colors" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel */}
          <div className="relative rounded-lg overflow-hidden lg:col-span-5">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1 relative">
              {/* Progress Bar */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 border-none transition-all duration-500"
                style={{
                  width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
                }}
              />

              {/* Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <TemplateSelector
                  selectedTemplate={resume.template}
                  onChange={(template) =>
                    setResume((prev) => ({ ...prev, template }))
                  }
                />
                <ColorPicker
                  selectedColor={resume.accent_color}
                  onChange={(color) =>
                    setResume((prev) => ({ ...prev, accent_color: color }))
                  }
                />
                <div className="flex items-center gap-2 ml-auto">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                      }
                      className="flex items-center gap-1 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors mr-4"
                    >
                      <ChevronLeftIcon className="w-5 h-5" /> Previous
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1),
                      )
                    }
                    className={`flex items-center gap-1 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors ${
                      activeSectionIndex === sections.length - 1
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  >
                    Next <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {activeSection.id === "personal_info" && (
                  <PersonalInfoForm
                    data={resume.personal_info || {}}
                    onChange={(data) =>
                      setResume((prev) => ({ ...prev, personal_info: data }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resume.professional_summary || ""}
                    onChange={(data) =>
                      setResume((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResume}
                  />
                )}

                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resume.experiences || []}
                    onChange={(data) =>
                      setResume((prev) => ({ ...prev, experiences: data }))
                    }
                    setResume={setResume}
                  />
                )}

                {activeSection.id === "education" && (
                  <EducationForm
                    data={resume.educations || []}
                    onChange={(data) =>
                      setResume((prev) => ({ ...prev, educations: data }))
                    }
                  />
                )}

                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resume.projects || []}
                    onChange={(data) =>
                      setResume((prev) => ({ ...prev, projects: data }))
                    }
                  />
                )}

                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resume.skills || []}
                    onChange={(data) =>
                      setResume((prev) => ({ ...prev, skills: data }))
                    }
                  />
                )}
              </div>

              <button
                className="bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm"
                onClick={() => toast.promise(save(), { loading: "Saving..." })}
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute top-0 left-0 right-0 flex items-center justify-end gap-2">
                {resume.public && (
                  <button
                    onClick={handleShare}
                    className="flex p-2 items-center gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors"
                  >
                    <Share2Icon className="size-4" /> Share
                  </button>
                )}

                <button
                  onClick={changeResumeVisibility}
                  className="flex p-2 items-center gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-purple-300 hover:ring transition-colors"
                >
                  {resume.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                  {resume.public ? "Public" : "Private"}
                </button>

                <button
                  onClick={downloadResume}
                  className="flex p-2 items-center gap-2 text-xs bg-gradient-to-br from-red-100 to-red-200 text-red-600 rounded-lg ring-red-300 hover:ring transition-colors"
                >
                  <DownloadIcon className="size-4" /> Download
                </button>
              </div>
            </div>

            <ResumePreview
              data={resume}
              template={resume.template}
              accentColor={resume.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
}





