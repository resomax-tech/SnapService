// ✅ Normalize any date (string or Date) to LOCAL midnight
export const normalizeLocalDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()); // local midnight
};

// ✅ Convert Date to YYYY-MM-DD string (LOCAL)
export const toDateKey = (date) => {
  const d = normalizeLocalDate(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // always correct for local
};

// ✅ Convert YYYY-MM-DD string to Date (LOCAL)
export const fromDateKey = (key) => {
  if (!key) return null;
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d); // local midnight again
};
