export function getIdParam(params: Record<string, string>): string {
  const id = params["id"];

  if (typeof id !== "string" || id.trim() === "") {
    throw new Error("Invalid or missing 'id' parameter.");
  }

  return id;
}
