import {connectMongoDB} from "@lib/connect/MongoConnect";
import User from "@lib/models/UserModel";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(405).send({msg: "Only GET requests are allowed."});
        return
    }

    const userId = req.query

    try {
        await connectMongoDB()
        const users = await User.findById(userId)
        if (!users) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).send(users)
    } catch (e) {
        console.log(e)
        res.status(400).send({e, msg: "Something went wrong!"});
    }
}
