import { useFormBUilder } from "../context/FormBuilderContext";
import { FIELD_TYPES } from "../types/constants";
import { Filed } from "./Field";

export const FormBuilder = () => {
  const { state, dispatch } = useFormBUilder();

  const handleAddField = (type: (typeof FIELD_TYPES)[number]) => {
    dispatch({ type: "ADD_FIELD", payload: { fieldType: type } });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 max-w-6xl mx-auto">
      {/* left form */}
      <div className="w-full md:w-64 bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Add Field</h1>
        <div className="flex flex-col space-y-4">
          {FIELD_TYPES.map((type) => (
            <button
              onClick={() => handleAddField(type)}
              className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      {/* right form */}
      <div className="bg-white rounded-xl shadow flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Form Builder</h1>

        {state.fields.map((field) => (
          <Filed key={field.id} field={field} />
        ))}
      </div>
    </div>
  );
};
