/**
 * Utility function to generate a unique invoice number based on the current date and time.
 * The generated invoice number follows the format:
 * `INVYYYYMMDDHHMMSSmmm` where:
 * - `YYYY` is the current year.
 * - `MM` is the current month (01 to 12).
 * - `DD` is the current day of the month (01 to 31).
 * - `HH` is the current hour (00 to 23).
 * - `MM` is the current minute (00 to 59).
 * - `SS` is the current second (00 to 59).
 * - `mmm` is the current millisecond (000 to 999).
 *
 * This function uses the `INV` constant to prepend the generated number.
 *
 * @returns {string} - Returns the generated invoice number, formatted with the prefix and unique timestamp.
 */
export const generateInvoiceNumber = () => {
  const date = new Date();
  // Generate a unique number from the current date and time
  const uniqueNumber = `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}${date
    .getHours()
    .toString()
    .padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}${date.getMilliseconds()}`;
  return `INV${uniqueNumber}`;
};
