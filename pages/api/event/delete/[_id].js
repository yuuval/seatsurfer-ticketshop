import { connectMongoDB } from "@lib/connect/MongoConnect";
import Event from "@lib/models/EventModel";

export default async function handler(req, res) {
    if (req.method !== "DELETE") {
        res.status(405).send({ msg: "Only DELETE requests are allowed." });
        return;
    }

    const eventId = req.query;

    try {
        await connectMongoDB();
        const event = await Event.findByIdAndDelete(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }

        res.status(200).json({ message: "Event deleted successfully." });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e, message: "Internal server error." });
    }
}
