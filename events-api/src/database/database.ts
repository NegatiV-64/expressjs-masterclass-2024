import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";

export class DbClient {
  public readonly connection = new DataSource({
    type: "sqlite",
    database: "./database/data.db",
    logging: false,
  });

  public async init() {
    await this.connection.initialize();

    // await this.createEventsTable();
  }

  // private async createEventsTable() {
  //   const createTableQuery = `
  //     CREATE TABLE IF NOT EXISTS events (
  //       event_id TEXT PRIMARY KEY,
  //       event_name TEXT NOT NULL,
  //       event_description TEXT,
  //       event_location TEXT,
  //       event_date TEXT NOT NULL,
  //       event_created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  //       event_updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  //     );
  //   `;

  //   await this.execute(createTableQuery);
  // }

  public async execute<T, K = unknown>(
    query: string,
    params?: K[]
  ): Promise<T[]> {
    const queryRunner = this.connection.createQueryRunner();

    try {
      const result = await queryRunner.query(query, params);

      return result;
    } finally {
      await queryRunner.release();
    }
  }
}

export const db = new DbClient();

export async function seed() {
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

  await db.execute("BEGIN TRANSACTION;");

  for (const event of mockData) {
    await db.execute(
      `INSERT INTO events (event_id, event_name, event_description, event_location, event_date) VALUES (?, ?, ?, ?, ?);`,
      [
        event.event_id,
        event.event_name,
        event.event_description,
        event.event_location,
        event.event_date,
      ]
    );
  }

  await db.execute("COMMIT;");
}
