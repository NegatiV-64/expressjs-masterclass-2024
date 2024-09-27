import { z } from "zod";

export const eventsIdDtoSchema = z
    .string()
    .uuid({ message: "Invalid Id" });
