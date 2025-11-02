import React from "react";
import { BriefcaseBusiness, Globe, Linkedin, Mail, Phone, User, MapPin } from "lucide-react";

export default function PersonalInfoForm({ data, onChange, removeBackground, setRemoveBackground }) {

  function handleChange(field, value) {
    onChange({ ...data, [field]: value });
  }

  const fields = [
    { key: "full_name", label: "Full Name", type: "text", required: true, icon: User },
    { key: "email", label: "Email Address", type: "email", required: true, icon: Mail },
    { key: "phone", label: "Phone Number", type: "tel", icon: Phone },
    { key: "location", label: "Location", type: "text", icon: MapPin },
    { key: "profession", label: "Profession", type: "text", icon: BriefcaseBusiness },
    { key: "linkedin", label: "Linkedin Profile", type: "url", icon: Linkedin },
    { key: "website", label: "Personal Website", type: "url", icon: Globe },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      <p className="text-sm text-gray-600">Get Started with the personal information.</p>

      <div className="flex items-center gap-4 mt-4">
        <label className="cursor-pointer">
          {data.image ? (
            <img
              src={typeof data.image === "string" ? data.image : URL.createObjectURL(data.image)}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80"
            />
          ) : (
            <div className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-700">
              <User className="w-10 h-10 p-2.5 border rounded-full" /> Upload User Image
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange("image", e.target.files[0])}
            className="hidden"
          />
        </label>

        {typeof data.image === "object" && (
          <div className="flex flex-col gap-1 pl-1 text-sm">
            <p>Remove Background</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={removeBackground}
                onChange={() => setRemoveBackground((prev) => !prev)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-indigo-600 transition-colors duration-200"></div>
              <span
                className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                  removeBackground ? "translate-x-4" : ""
                }`}
              ></span>
            </label>
          </div>
        )}
      </div>

      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="w-4 h-4" />
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-600 outline-none"
              required={field.required}
              placeholder={`Enter Your ${field.label}`}
            />
          </div>
        );
      })}
    </div>
  );
}



