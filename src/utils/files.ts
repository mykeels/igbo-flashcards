export const cleanFileName = (text: string) => {
  return text
    .replace(/ /g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();
};