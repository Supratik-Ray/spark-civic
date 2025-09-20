export const generateTicketNo = () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  // e.g. "20250920"

  const randomPart = Math.floor(1000 + Math.random() * 9000);
  // 4-digit random number, e.g. 4821

  return `CIV-${datePart}-${randomPart}`;
};
