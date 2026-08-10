// List of month names
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export function formatDate(dateString: string) {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Extract the day, month, and year
  const day = date.getDate();
  const month = months[date.getMonth()]; // Get month name
  const year = date.getFullYear();

  // Return the formatted string
  return `${day} ${month} ${year}`;
}
