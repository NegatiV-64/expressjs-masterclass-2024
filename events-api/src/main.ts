import { app } from "#/app";
import { db, seed } from "#/database/database";
import { Logger } from "#/shared/libs/logger.lib";

async function main() {
  await db.init();

  app.listen(3002, () => {
    Logger.info(`Server is running on http://localhost:3002`);
  });
}

main().catch((err) => {
  Logger.error(err);
  process.exit(1);
});
