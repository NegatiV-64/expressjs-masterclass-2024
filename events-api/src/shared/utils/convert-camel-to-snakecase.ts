export function convertCamelToSnakeCase(str: string): string {
  return str
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
}
