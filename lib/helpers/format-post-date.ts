export function formatPostDate(input: string) {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;

  return date.toLocaleString("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

