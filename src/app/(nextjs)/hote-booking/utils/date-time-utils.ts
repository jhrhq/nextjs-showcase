export const formatDate = (date: string | Date): string | null => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return null;
  }
  return parsedDate.toLocaleString("en-US", { year: "numeric", month: "long" });
};
