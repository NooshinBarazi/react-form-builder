import React, { createContext, useReducer, useState } from "react";

export type FieldType = "text" | "textarea" | "select" | "checkbox" | "paragraph";

export interface FormField {
    id: string;
    type: FieldType;
    label: string;
    required?: boolean;
    options?: string[];
  }

  type Action = 
    | { type: "ADD_FIELD"; payload: { fieldType: FieldType } }
    | { type: "REMOVE_FIELD"; payload: { id: string } }
    | { type: "UPDATE_FIELD"; payload: {id: string, field: Partial<FormField>} }
    | { type: "REORDER_FIELDS"; payload: {fromIndex: number; toIndex: number} };

    type State = {
        fields : FormField[];
    }

    const initialState: State = { fields: [] };

    function formReducer(state: State, action: Action): State{
        switch (action.type) {
            default:
                return state;
        }
    }

const FormBuilderContext = createContext<{state: State, dispatch: React.Dispatch<Action>} | undefined>(undefined);

export const FormBUilderProvider = ({children}: {children: React.ReactNode})=>{
    const [state, dispatch] = useReducer(formReducer, initialState)
    return (
        <FormBuilderContext.Provider value={{state, dispatch}}>
            {children}
        </FormBuilderContext.Provider>
    )
}