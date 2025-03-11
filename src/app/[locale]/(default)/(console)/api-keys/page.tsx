import Empty from "@/components/blocks/empty";
import TableSlot from "@/components/console/slots/table";
import { Table as TableSlotType } from "@/types/slots/table";
import { getTranslations } from "next-intl/server";
import { getUserApikeys } from "@/models/apikey";
import { getUserUuid } from "@/services/user";
import moment from "moment";

export default async function () {
  const t = await getTranslations();

  const user_uuid = await getUserUuid();
  if (!user_uuid) {
    return <Empty message="no auth" />;
  }

  const data = await getUserApikeys(user_uuid);

  const table: TableSlotType = {
    title: t("api_keys.title"),
    tip: {
      title: t("api_keys.tip"),
    },
    toolbar: {
      items: [
        {
          title: t("api_keys.create_api_key"),
          url: "/api-keys/create",
          icon: "RiAddLine",
        },
      ],
    },
    columns: [
      {
        title: t("api_keys.table.name"),
        name: "title",
      },
      {
        title: t("api_keys.table.key"),
        name: "api_key",
        type: "copy",
        callback: (item: any) => {
          return item.api_key.slice(0, 4) + "..." + item.api_key.slice(-4);
        },
      },
      {
        title: t("api_keys.table.created_at"),
        name: "created_at",
        callback: (item: any) => {
          return moment(item.created_at).fromNow();
        },
      },
    ],
    data,
    empty_message: t("api_keys.no_api_keys"),
  };

  return <TableSlot {...table} />;
}
