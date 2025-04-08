import React, { useState } from "react";
import { useFormBUilder } from "../context/FormBuilderContext";
import { FormField } from "../types/form";

export const Filed: React.FC<{ field: FormField }> = ({ field }) => {
  const { dispatch } = useFormBUilder();
  const [label, setLabel] = useState(field.label);
  const [options, setOptions] = useState(field.options || []);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
    dispatch({
      type: "UPDATE_FIELD",
      payload: { id: field.id, field: { label: e.target.value } },
    });
  };
  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
    dispatch({
      type: "UPDATE_FIELD",
      payload: { id: field.id, field: { options: updated } },
    });
  };
  const addOption = () => {
    const updated = [...options, ""];
    setOptions(updated);
    dispatch({
      type: "UPDATE_FIELD",
      payload: { id: field.id, field: { options: updated } },
    });
  };
  const handleDelete = () => {
    dispatch({ type: "REMOVE_FIELD", payload: { id: field.id } });
  };
  const renderInput = () => {
    switch (field.type) {
      case "textarea":
        return (
          <textarea
            className="w-full border px-2 py-1 text-sm"
            placeholder="Textarea preview"
            disabled
          />
        );
      case "select":
        return (
          <>
            <select className="w-full border px-2 py-1 text-sm">
              {field.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div>
              {options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  className="w-full border px-2 py-1 text-xs"
                  placeholder={`Option ${i + 1}`}
                />
              ))}
              <button
                onClick={addOption}
                className="text-xs text-blue-600 mt-1"
              >
                + Add Option
              </button>
            </div>
          </>
        );
      case "checkbox":
        return (
          <>
            <div className="space-y-1">
              {options.map((opt, i) => (
                <label key={i} className="block">
                  <input type="checkbox" className="mr-2" /> {opt}
                </label>
              ))}
            </div>
            <div className="mt-2 space-y-1">
              {options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  className="w-full border px-2 py-1 text-xs"
                  placeholder={`Option ${i + 1}`}
                />
              ))}
              <button
                onClick={addOption}
                className="text-xs text-blue-600 mt-1"
              >
                + Add Option
              </button>
            </div>
          </>
        );
      case "paragraph":
        return <p className="text-sm text-gray-600 italic">{label}</p>;
      default:
        return (
          <input
            type="text"
            className="w-full border px-2 py-1 text-sm"
            placeholder="Input field preview"
            disabled
          />
        );
    }
  };
  return (
    <div className="border p-4 rounded bg-gray-50 relative">
      {field.type !== "paragraph" && (
        <input
          type="text"
          value={label}
          onChange={handleLabelChange}
          className="w-full font-semibold text-lg border-b pb-1 mb-2"
        />
      )}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-red-500 text-sm hover:underline"
      >
        حذف
      </button>
      {renderInput()}
    </div>
  );
};
