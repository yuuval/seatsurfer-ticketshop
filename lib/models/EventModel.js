import {Schema, model, models} from "mongoose";

const eventSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        host_id: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        ticket_amount: {
            type: Number,
            required: true,
        },
    },
    {collection: "event"}
);

const Event = models.Event || model("Event", eventSchema)


export default Event;