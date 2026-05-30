import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async (params) => {
  const store = await cookies();
  const locale = params.locale || store.get("locale")?.value || "en";
  const messages = (await import("../domains/hotel-booking/messages/en.json"))
    .default;
  console.log(messages);

  return {
    locale,
    messages,
  };
});
1;
