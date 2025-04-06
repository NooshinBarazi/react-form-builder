import React, { useState } from "react";
import { useFormBUilder } from "../context/FormBuilderContext"
import { FormField } from "../types/form";

export const Filed: React.FC<{field: FormField}> =({field})=>{
     const{ dispatch } = useFormBUilder();
     const [label, setLabel] = useState(field.label);

     const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setLabel(e.target.value);
        dispatch({type: 'UPDATE_FIELD', payload: {id: field.id, field: {label: e.target.value}}})
     }

    return(
        <div className="border p-4 rounded bg-gray-50">
        <input
          type="text"
          value={label}
          onChange={handleLabelChange}
          className="w-full font-semibold text-lg border-b pb-1 mb-2"
        />
        <input
          type="text"
          className="w-full border px-2 py-1 text-sm"
          placeholder="Input field preview"
          disabled
        />
      </div>
    )
}