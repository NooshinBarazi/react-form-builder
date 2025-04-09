import React, { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { FieldType, FormField } from "../types/form";


type Action =
  | { type: "ADD_FIELD"; payload: { fieldType: FieldType } }
  | { type: "REMOVE_FIELD"; payload: { id: string } }
  | { type: "UPDATE_FIELD"; payload: { id: string; field: Partial<FormField> } }
  | { type: "REORDER_FIELDS"; payload: { fromIndex: number; toIndex: number } };

type State = {
  fields: FormField[];
};

const initialState: State = { fields: [] };

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_FIELD":
      const newField: FormField = {
        id: uuidv4(),
        type: action.payload.fieldType,
        label: "New Field",
        required: false,
        options:
          action.payload.fieldType === "select" ||
          action.payload.fieldType === "checkbox"
            ? ["Option 1"]
            : undefined,
      };
      return { ...state, fields: [...state.fields, newField] };
    case "UPDATE_FIELD":
      return {
        ...state,
        fields: state.fields.map((f) =>
          f.id === action.payload.id ? { ...f, ...action.payload.field } : f
        ),
      };
      case "REMOVE_FIELD":
      return {
        ...state,
        fields: state.fields.filter((f) => f.id !== action.payload.id),
      };
      case "REORDER_FIELDS":
        const updatedFields = [...state.fields];
        const [movedItem] = updatedFields.splice(action.payload.fromIndex, 1);
        updatedFields.splice(action.payload.toIndex, 0, movedItem);
        return {
          ...state,
          fields: updatedFields,
        };
    default:
      return state;
  }
}

const FormBuilderContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const FormBUilderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return (
    <FormBuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </FormBuilderContext.Provider>
  );
};

export const useFormBUilder = () => {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error("useFormBuilder must be used within a FormBuilderProvider");
  }
  return context;
};
