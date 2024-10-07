import { ZodError } from "zod";

type ErrorField = {
  field: string;
  message: string;
};

export function parseSchemaError(error: unknown) {
  if (!(error instanceof ZodError)) {
    return null;
  }

  const fields: ErrorField[] = error.errors.map((error) => ({
    field: error.path.length > 0 ? error.path.join(".") : "root",
    message: error.message,
  }));

  return fields;
}
