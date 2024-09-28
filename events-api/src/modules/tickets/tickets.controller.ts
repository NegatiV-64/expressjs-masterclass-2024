import { Router, Request, Response } from "express";
import {TicketsService} from "#/modules/tickets/tickets.service";
import {CreateTicketDtoSchema} from "#/modules/tickets/dto/create-ticket-params.dto";
import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { eventsCreateRequestBodyDtoSchema } from "../events/dto/requests/events-create.dto";
import { getId } from "#/shared/util";
import { notFoundError } from "#/shared/error";
export const TicketsController = Router();

TicketsController.post("/", validateRequestBody(CreateTicketDtoSchema), async (req: Request, res: Response) => {
    const ticket = await TicketsService.createTicket(req.body);
    return res.status(201).json({
        message: "Ticket created successfully!",
        data: ticket,
    })
});

// TicketsController.get("/events/:eventId/tickets", async (req: Request, res: Response) => {
//     const eventId = req.params;

//     const eventIdSchema = z.string().uuid();
//     const validationResult = eventIdSchema.safeParse(eventId);

//     if (!validationResult.success) {
//         return res.status(400).json({
//             message: "Invalid event ID",
//         });
//     }

//     try {
//         tickets = await TicketsService.getTicketsByEventId(eventId);
//         let tickets;
//         return res.status(200).json({
//             message: "Tickets retrieved successfully",
//             data: tickets,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: "An error occurred while fetching tickets",
//         });
//     }
// });

TicketsController.get("/", async (req: Request, res: Response) => {
    try{
        const tickets = await TicketsService.getAllTickets();
        return res.status(200).json({
            messaage:"Tickets retrieved successfully",
            data: tickets,
        });
    }catch(err){
        return res.status(500).json({
            message: err
        });
    }
});

TicketsController.get("/ticketId",validateRequestBody(eventsCreateRequestBodyDtoSchema), async (req: Request, res: Response) => {
    try{
        const ticket = await TicketsService.getTicket(getId(req.params))
        return res.status(200).json({
            message: "Tickets reveived successfully",
            data: ticket
        });
    }catch(err){
        if(err instanceof notFoundError){
            return res.status(404).json({
                message: err,
            })
        }
    }
});