import { Router } from "express";
import { TicketsService } from "./tickets.service";

export const TicketsController = Router();


TicketsController.get("/", async (req, res) => {
    const tickets = await TicketsService.getAll();
    return res.status(200).json({
        message: "Tickets retrieved successfully",
        data: tickets,
    });
});

