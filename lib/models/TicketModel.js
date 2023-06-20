import {Schema, model, models} from "mongoose";

const ticketSchema = new Schema({
        event_id: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        buyer_id: {
            type: String,
            required: true,
        },
    },
    {collection: "ticket"}
);

const Ticket = models.Ticket || model("Ticket", ticketSchema)

export default Ticket;