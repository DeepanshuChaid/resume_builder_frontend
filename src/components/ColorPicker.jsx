
import { Palette, Check } from "lucide-react";
import React, { useState } from "react";

export default function ColorPicker({ selectedColor, onChange }) {
  const colors = [
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f97316" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Pink", value: "#ec4899" },
    { name: "Gray", value: "#6b7280" },
    { name: "Black", value: "#1f2937" },
  ];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ml-4">
      <button
        className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-3 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Palette size={16} /> <span className="max-sm:hidden">Accent Color</span>
      </button>

      {isOpen && (<>
         <input type="text" value={selectedColor} onChange={(e) => onChange(e.target.value)} className="p-2 w-60 absolute top-38 border border-gray-200 shadow-lg bg-white" />
        <div className="grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
          {colors.map((color) => (
            <div
              key={color.value}
              className="size-8 rounded-full cursor-pointer border border-gray-300 hover:border-purple-500 transition-all relative"
              style={{ backgroundColor: color.value }}
              onClick={() => onChange(color.value)}
            >
              {selectedColor === color.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              
              )}
            </div>
          ))}
        </div>
      </>
      )}
      
    </div>
  );
}
