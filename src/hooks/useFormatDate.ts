import { useCallback } from "react";

export function useFormatDate(
  locale: string = "en-US",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short", // e.g., Sep
    day: "numeric",
  }
) {
  const formatDate = useCallback(
    (date: string | Date) => {
      const d = typeof date === "string" ? new Date(date) : date;
      const now = new Date();

      const isToday =
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear();

      if (isToday) return "Today";

      const yesterday = new Date();
      yesterday.setDate(now.getDate() - 1);
      const isYesterday =
        d.getDate() === yesterday.getDate() &&
        d.getMonth() === yesterday.getMonth() &&
        d.getFullYear() === yesterday.getFullYear();

      if (isYesterday) return "Yesterday";

      return new Intl.DateTimeFormat(locale, options).format(d);
    },
    [locale, options]
  );

  return { formatDate };
}
