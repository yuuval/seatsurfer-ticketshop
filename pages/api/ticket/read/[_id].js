import {connectMongoDB} from "@lib/connect/MongoConnect";
import Ticket from "@lib/models/TicketModel";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(405).send({msg: "Only GET requests are allowed."});
        return
    }

    const user_id = req.query

    try {
        await connectMongoDB()
        const tickets = await Ticket.find({buyer_id: user_id})
        if (!tickets) {
            return res.status(404).json({ message: "Ticket not found." });
        }
        res.status(200).send(tickets)
    } catch (e) {
        console.log(e)
        res.status(400).send({e, msg: "Something went wrong!"});
    }
}
