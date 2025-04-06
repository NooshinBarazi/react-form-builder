export type FieldType = "text" | "textarea" | "select" | "checkbox" | "paragraph";

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
  options?: string[];
}
