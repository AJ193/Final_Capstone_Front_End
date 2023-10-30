export default function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: false, // Use 24-hour format
  };
  return date.toLocaleString(undefined, options);
}
