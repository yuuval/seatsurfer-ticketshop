import {connectMongoDB} from "@lib/connect/MongoConnect";
import Ticket from "@lib/models/TicketModel";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).send({msg: "Only POST requests are allowed."});
        return
    }
    const ticket = req.body
    try {
        await connectMongoDB()
        Ticket.create(ticket).then((data) => {
            console.log(data);
            res.status(201).send(data)
        })
    } catch (e) {
        console.log(e)
        res.status(400).send({e, msg: "Something went wrong!"});
    }
}
