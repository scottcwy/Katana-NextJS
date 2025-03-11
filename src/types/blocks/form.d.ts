import { Button } from "@/types/blocks/base";

type ValidationRule = {
  required?: boolean;
  min?: number;
  max?: number;
  message?: string;
  email?: boolean;
};

export interface FormField {
  name?: string;
  title?: string;
  type?:
    | "text"
    | "textarea"
    | "number"
    | "email"
    | "password"
    | "select"
    | "url"
    | "code_editor"
    | "markdown_editor";
  placeholder?: string;
  options?: {
    title: string;
    value: string;
  }[];
  value?: string;
  tip?: string;
  attributes?: Record<string, any>;
  validation?: ValidationRule;
}

export interface FormSubmit {
  button?: Button;
  handler?: (
    data: FormData,
    passby?: any
  ) => Promise<
    | {
        status: "success" | "error";
        message: string;
        redirect_url?: string;
      }
    | undefined
    | void
  >;
}

export interface Form {
  fields: FormField[];
  data?: any;
  submit?: FormSubmit;
}
