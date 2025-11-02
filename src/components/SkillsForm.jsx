
import React, { useState } from "react";
import { Plus, Sparkles, X } from "lucide-react";

export default function SkillsForm({ data, onChange }) {
  const [newSkills, setNewSkills] = useState("");

  function addSkill() {
    if (newSkills.trim() && !data.includes(newSkills.trim())) {
      onChange([...data, newSkills.trim()]);
      setNewSkills("");
    }
  }

  function removeSkill(index) {
    onChange(data.filter((_, i) => i !== index));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          Skills
        </h3>
        <p className="text-sm text-gray-500">Add your skills here.</p>
      </div>

      {/* Input section */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <input
          type="text"
          placeholder="Enter your skills (e.g., Java, Go, Python, Full-Stack)"
          className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 w-full"
          value={newSkills}
          onChange={(e) => setNewSkills(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={addSkill}
          disabled={!newSkills.trim()}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
        >
          <Plus className="size-4" /> Add Skill
        </button>
      </div>

      {/* Skills List */}
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2 mt-2">
          {data.map((skill, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
            >
              {skill}
              <button
                className="ml-1 hover:bg-indigo-600 hover:text-white rounded-full p-0.5 transition-colors"
                onClick={() => removeSkill(index)}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-2">
          <Sparkles className="w-10 h-10 mx-auto text-gray-300" />
          <p>No skills added yet</p>
          <p className="text-sm">Add your technical and soft skills above.</p>
        </div>
      )}

      {/* Tip Section */}
      <div className="bg-indigo-50 p-3 rounded-lg mt-4">
        <p className="text-sm text-indigo-700">
          <strong>Tip:</strong> Add 8–12 relevant skills — include both technical
          (languages, tools) and soft skills (leadership, communication).
        </p>
      </div>
    </div>
  );
}
