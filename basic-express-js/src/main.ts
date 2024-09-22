import express, { Request, Response, NextFunction } from "express";
import { init } from "./database";
import { eventsRouter } from "./events";

const app = express();

// ==== Middlewares ==== //
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} - ${req.url}`);
  next();
});

// ==== Routes ==== //
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the Event Management API",
  });
});

app.use("/events", eventsRouter);

app.listen(9100, async () => {
  await init();

  console.log("Server is running on http://localhost:9100");
});
