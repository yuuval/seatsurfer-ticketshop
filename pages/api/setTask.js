import {connectMongoDB} from "@lib/connect/MongoConnect";
import Task from "@lib/models/TaskModel";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).send({msg: "Only POST requests are allowed."});
        return
    }
        const {task} = req.body

    try {
        await connectMongoDB()
        Task.create({task}).then((data) => {
            console.log(data);
            res.status(201).send(data)
        })
    } catch (e) {
        console.log(e)
        res.status(400).send({e, msg: "Something went wrong!"});
    }
}
