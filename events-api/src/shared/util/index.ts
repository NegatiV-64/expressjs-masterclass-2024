export function getId(params: Record<string, string>): string {
    const id = params["id"];

    if (typeof id !== "string") {
        throw new Error("Invalid or missing 'id' parameter.");
    }

    return id;
}

export const eventColumns = `
  event_id as eventId,
  event_name as eventName,
  event_description as eventDescription,
  event_location as eventLocation,
  event_date as eventDate,
  event_created_at as eventCreatedAt,
  event_updated_at as eventUpdatedAt
  `;