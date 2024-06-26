import {connectMongoDB} from "@lib/connect/MongoConnect";
import User from "@lib/models/UserModel";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).send({msg: "Only POST requests are allowed."});
        return
    }
    console.log(req.body)
    const user = req.body

    try {
        await connectMongoDB()
        User.create(user).then((data) => {
            console.log(data);
            res.status(201).send(data)
        })
    } catch (e) {
        console.log(e)
        res.status(400).send({e, msg: "Something went wrong!"});
    }
}
