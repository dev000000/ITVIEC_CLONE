export function formattedDate(locale: string = "en"): string {
  const date = new Date();
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
