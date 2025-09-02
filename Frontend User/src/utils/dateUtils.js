// src/utils/dateUtils.js
export function formatISODate(date) {
  return new Date(date).toISOString().split("T")[0];
}
