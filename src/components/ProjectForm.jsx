
import React from "react";
import { FolderIcon, Plus, Trash2 } from "lucide-react";

export default function ProjectForm({ data, onChange }) {
  function addProject() {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...data, newProject]);
  }

  function removeProject(index) {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  }

  function updateProject(index, field, value) {
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
            <FolderIcon className="w-5 h-5 text-purple-600" />
            Projects
          </h3>
          <p className="text-sm text-gray-500">
            Add your projects (personal, academic, or freelance).
          </p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Another
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FolderIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No projects added yet.</p>
          <p className="text-sm text-gray-400">
            Click "Add Another" to add your first project.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-gray-800">
                  Project #{index + 1}
                </h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-sm text-red-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={project.name || ""}
                  onChange={(e) =>
                    updateProject(index, "name", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Project Type (e.g. Web, Mobile)"
                  value={project.type || ""}
                  onChange={(e) =>
                    updateProject(index, "type", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
              </div>

              <textarea
                rows={4}
                placeholder="Project Description"
                value={project.description || ""}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                className="w-full text-sm px-3 py-2 rounded-lg border border-gray-300 resize-none"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


