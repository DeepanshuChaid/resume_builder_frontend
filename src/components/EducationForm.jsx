import React from "react";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

export default function EducationForm({ data, onChange }) {
  function addEducation() {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };
    onChange([...data, newEducation]);
  }

  function removeEducation(index) {
    const updated = data.filter((e, i) => i !== index);
    onChange(updated);
  }

  function updateEducation(index, field, value) {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <GraduationCap className="w-5 h-5 text-purple-600" />
            Education
          </h3>
          <p className="text-sm text-gray-500">
            Add your educational background.
          </p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Another
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No education added yet.</p>
          <p className="text-sm text-gray-400">
            Click "Add Another" to add your first education entry.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-gray-800">
                  Education #{index + 1}
                </h4>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-sm text-red-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Institution Name"
                  value={education.institution || ""}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Degree (e.g. B.Tech, M.Sc)"
                  value={education.degree || ""}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Field of Study"
                  value={education.field || ""}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
                <input
                  type="month"
                  placeholder="Graduation Date"
                  value={education.graduation_date || ""}
                  onChange={(e) =>
                    updateEducation(index, "graduation_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
                <input
                  type="text"
                  placeholder="GPA / Percentage"
                  value={education.gpa || ""}
                  onChange={(e) =>
                    updateEducation(index, "gpa", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
