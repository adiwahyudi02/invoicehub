/**
 * Utility function to format a numeric string by adding currency separators
 * every three digits from the right. This is typically used for formatting
 * currency values with separators (e.g., 1,000,000).
 *
 * @param value {string} - The raw input value to format.
 * @param currencySeparator {string} - The separator to use, e.g., '.' for the thousands separator (default is '.').
 *
 * @returns {string} - Returns the formatted string with separators added.
 */
export const formatCurrency = (
  value: string,
  currencySeparator: string = "."
): string => {
  // Remove non-numeric characters (except the ones for decimal point)
  let newValue = value.replace(/[^0-9]/g, "");

  // Add separators every 3 digits from the right
  newValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, currencySeparator);

  return newValue;
};

/**
 * Utility function to unformat a currency string by removing the separators
 * and returning the numeric string. This is typically used for retrieving
 * raw numeric input from a formatted value.
 *
 * @param value {string} - The formatted string to unformat.
 * @param currencySeparator {string} - The separator to remove, e.g., '.' for the thousands separator (default is '.').
 *
 * @returns {string} - Returns the unformatted numeric string.
 */
export const unformatCurrency = (
  value: string,
  currencySeparator: string = "."
): string => {
  // Remove all separators and non-numeric characters
  const newValue = value.replace(new RegExp(`\\${currencySeparator}`, "g"), "");

  return newValue;
};
