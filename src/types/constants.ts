import { FieldType } from "./form";

export const FIELD_TYPES: FieldType[] = [
  "text",
  "textarea",
  "select",
  "checkbox",
  "paragraph",
];

export const FIELD_ICONS: Record<string, string> = {
  text: "🔤",
  textarea: "📝",
  select: "🔽",
  checkbox: "✅",
  paragraph: "📄",
};
