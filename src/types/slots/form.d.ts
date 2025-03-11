import { FormField, FormSubmit } from "@/types/blocks/form";
import { Slot } from "@/types/slots/base";

export interface Form extends Slot {
  fields?: FormField[];
  submit?: FormSubmit;
}
