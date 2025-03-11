import Crumb from "@/components/blocks/crumb";
import FormBlock from "@/components/blocks/form";
import { Form as FormSlotType } from "@/types/slots/form";
import { Separator } from "@/components/ui/separator";
import Toolbar from "@/components/blocks/toolbar";

export default function ({ ...form }: FormSlotType) {
  return (
    <div className="space-y-6">
      {form.crumb?.items && <Crumb items={form.crumb.items} />}
      <div>
        <h3 className="text-lg font-medium">{form.title}</h3>
        <p className="text-sm text-muted-foreground">{form.description}</p>
      </div>
      {form.tip && (
        <p className="text-sm text-muted-foreground">
          {form.tip.description || form.tip.title}
        </p>
      )}
      {form.toolbar && <Toolbar items={form.toolbar.items} />}
      <Separator />
      <FormBlock {...form} />
    </div>
  );
}
