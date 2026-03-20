export function formatPostDate(input: string) {
  const date = new Date(input);

  if (Number.isNaN(date.getTime())) return input;

  try {
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  } catch {
    return date.toLocaleString("fr-FR");
  }
}
