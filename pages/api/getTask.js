import {connectMongoDB} from "@lib/connect/MongoConnect";
import Task from "@lib/models/TaskModel";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(405).send({msg: "Only GET requests are allowed."});
        return
    }

    try {
        await connectMongoDB()
        const tasks = await Task.find()
        res.status(200).send(tasks)
    } catch (e) {
        console.log(e)
        res.status(400).send({e, msg: "Something went wrong!"});
    }
}
