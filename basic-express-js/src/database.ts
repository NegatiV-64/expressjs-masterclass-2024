import { Sequelize } from "sequelize";
import { faker } from "@faker-js/faker";

export const client = new Sequelize({
  dialect: "sqlite",
  storage: "./database/data.db",
  logging: true,
});

export async function init() {
  await client.authenticate();

  const createEventsTable = `
    CREATE TABLE IF NOT EXISTS events (
        event_id TEXT PRIMARY KEY,
        event_name TEXT NOT NULL,
        event_description TEXT,
        event_location TEXT NOT NULL,
        event_date DATETIME NOT NULL,
        event_created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        event_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await client.query(createEventsTable);
}

async function seed() {
  const mockData = Array.from({ length: 5 }).map(() => ({
    event_id: faker.string.uuid(),
    event_name: `${faker.word.adjective()} ${faker.word.noun()}`,
    event_description: faker.lorem.paragraph(3),
    event_location: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.country()} ${faker.location.zipCode()}`,
    event_date: faker.date
      .future()
      .toISOString()
      .replace("T", " ")
      .replace("Z", ""),
  }));

  await client.query("BEGIN TRANSACTION;");

  for (const event of mockData) {
    await client.query(
      `INSERT INTO events (event_id, event_name, event_description, event_location, event_date) VALUES (?, ?, ?, ?, ?);`,
      {
        replacements: [
          event.event_id,
          event.event_name,
          event.event_description,
          event.event_location,
          event.event_date,
        ],
      }
    );
  }

  await client.query("COMMIT;");
}

process.on("SIGINT", async () => {
  await client.close();
  process.exit(0);
});

process.on("exit", async () => {
  await client.close();
});
