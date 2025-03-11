import { TableColumn } from "@/types/blocks/table";
import { Slot } from "@/types/slots/base";

export interface Table extends Slot {
  columns?: TableColumn[];
  empty_message?: string;
}
