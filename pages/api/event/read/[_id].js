import {connectMongoDB} from "@lib/connect/MongoConnect";
import Event from "@lib/models/EventModel";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(405).send({msg: "Only GET requests are allowed."});
        return
    }

    const eventId = req.query

    try {
        await connectMongoDB()
        const events = await Event.findById(eventId)
        if (!events) {
            return res.status(404).json({ message: "Event not found." });
        }
        res.status(200).send(events)
    } catch (e) {
        console.log(e)
        res.status(400).send({e, msg: "Something went wrong!"});
    }
}
