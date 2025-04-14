import React, { createContext, useContext, useState } from "react";
import { useFormBUilder } from "../context/FormBuilderContext";
import { FormField } from "../types/form";

const FieldContext = createContext<{ field: FormField }>({
  field: { id: "", type: "text", label: "" },
});

export const FormFieldCompound: React.FC<{ field: FormField }> & {
  Label: React.FC;
  Input: React.FC;
  Options: React.FC;
  Remove: React.FC;
} = ({ field }) => {
  return (
    <FieldContext.Provider value={{ field }}>
      <div className="bg-white border shadow-sm rounded-2xl p-4 mb-4 space-y-2 relative">
        <FormFieldCompound.Label />
        <FormFieldCompound.Input />
        <FormFieldCompound.Options />
        <FormFieldCompound.Remove />
      </div>
    </FieldContext.Provider>
  );
};

FormFieldCompound.Label = () => {
  const { field } = useContext(FieldContext);
  const { dispatch } = useFormBUilder();
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(field.label);

  if (field.type === "paragraph") return null;

  const handleBlur = () => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: { id: field.id, field: { label } },
    });
    setEditing(false);
  };

  return editing ? (
    <input
      autoFocus
      value={label}
      onChange={(e) => setLabel(e.target.value)}
      onBlur={handleBlur}
      className="w-full font-semibold text-lg border-b pb-1 mb-2"
    />
  ) : (
    <h3
      onClick={() => setEditing(true)}
      className="text-lg font-semibold cursor-pointer hover:underline"
    >
      {label || "(بدون عنوان)"}
    </h3>
  );
};

FormFieldCompound.Input = () => {
  const { field } = useContext(FieldContext);

  switch (field.type) {
    case "textarea":
      return (
        <textarea
          className="w-full border px-2 py-1 text-sm rounded"
          placeholder="Textarea preview"
          disabled
        />
      );
    case "select":
      return (
        <select className="w-full border px-2 py-1 text-sm rounded">
          {field.options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case "checkbox":
      return (
        <div className="space-y-1">
          {field.options?.map((opt, i) => (
            <label key={i} className="block text-sm">
              <input type="checkbox" className="mr-2" /> {opt}
            </label>
          ))}
        </div>
      );
    case "paragraph":
      return <p className="text-sm text-gray-600 italic">{field.label}</p>;
    default:
      return (
        <input
          type="text"
          className="w-full border px-2 py-1 text-sm rounded"
          placeholder="Input field preview"
          disabled
        />
      );
  }
};

FormFieldCompound.Options = () => {
  const { field } = useContext(FieldContext);
  const { dispatch } = useFormBUilder();

  if (!("options" in field) || !Array.isArray(field.options)) return null;

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...(field.options || [])];
    updated[index] = value;
    dispatch({
      type: "UPDATE_FIELD",
      payload: { id: field.id, field: { options: updated } },
    });
  };

  const addOption = () => {
    const updated = [...(field.options || []), ""];
    dispatch({
      type: "UPDATE_FIELD",
      payload: { id: field.id, field: { options: updated } },
    });
  };

  return (
    <div className="mt-2 space-y-1">
      {field.options.map((opt, i) => (
        <input
          key={i}
          type="text"
          value={opt}
          onChange={(e) => handleOptionChange(i, e.target.value)}
          className="w-full border px-2 py-1 text-xs rounded"
          placeholder={`Option ${i + 1}`}
        />
      ))}
      <button
        onClick={addOption}
        className="text-xs text-blue-600 mt-1 hover:underline"
      >
        + Add Option
      </button>
    </div>
  );
};

FormFieldCompound.Remove = () => {
  const { field } = useContext(FieldContext);
  const { dispatch } = useFormBUilder();

  return (
    <button
      onClick={() =>
        dispatch({ type: "REMOVE_FIELD", payload: { id: field.id } })
      }
      className="absolute top-2 right-2 text-red-500 text-sm hover:bg-red-100 px-2 py-1 rounded"
    >
      🗑 حذف
    </button>
  );
};
