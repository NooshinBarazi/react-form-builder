import React, { createContext, useState } from "react";

const FormBuilderContext = createContext({} as any);
export const FormBUilderProvider = ({children}: {children: React.ReactNode})=>{
    const [fields, setField] = useState([] as any[]);
    return (
        <FormBuilderContext.Provider value={{fields, setField}}>
            {children}
        </FormBuilderContext.Provider>
    )
}