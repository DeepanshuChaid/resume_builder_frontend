import { Layout, Check } from "lucide-react";
import React, { useState } from "react";

export default function TemplateSelector({ onChange, selectedTemplate }) {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview: "A Clean, traditional, resume format with clear sections and professional typography.",
    },
    {
      id: "modern",
      name: "Modern",
      preview: "A sleek, modern resume format with a clean, minimalist design and a focus on content."
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "A simple, minimalist resume format with a focus on content and readability."
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview: "An Ultra-clean design that puts your content front and center."
    }
  ];

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1 text-sm text-indigo-600 bg-gradient-to-br from-indigo-50 to-indigo-100 ring-indigo-300 hover:ring transition-all px-3 py-3 rounded-lg">
        <Layout size={15}/> <span className="max-sm:hidden">Templates</span>
      </button>
      {isOpen && (
        <div className="absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-lg">
          {templates.map((template) => (
            <div key={template.id} className={`relative p-3 border rounded-md cursor-pointer transition-all ${selectedTemplate === template.id ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-indigo-500"}`} onClick={() => {
              onChange(template.id);
              setIsOpen(false);
            }}>
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-indigo-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

                <div className="space-y-1">
                  <h4 className="font-medium text-gray-800">{template.name}</h4>
                  <div className="mt-2 p-2 bg-indigo-50 rounded text-xs text-gray-500 italic">{template.preview}</div>
                </div>
              </div>
          ))}
        </div>
      )}
    </div>
  )
}



