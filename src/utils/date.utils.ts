/**
 * Utility function to format a date string from "DD/MM/YYYY" to "MMM DD, YYYY".
 * This is useful for displaying dates in a more readable format.
 *
 * @param dateString {string} - The date string in "DD/MM/YYYY" format.
 *
 * @returns {string} - Returns the formatted date string in "MMM DD, YYYY" format.
 */
export const formatDate = (dateString: string): string => {
  const [day, month, year] = dateString.split("/").map(Number);
  if (!day || !month || !year) return "-";

  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};
