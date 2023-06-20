import { connectMongoDB } from "@lib/connect/MongoConnect";
import User from "@lib/models/UserModel";

export default async function handler(req, res) {
    if (req.method !== "PUT") {
        res.status(405).send({ msg: "Only PUT requests are allowed." });
        return;
    }

    const userId = req.query;
    const userData = req.body;

    try {
        await connectMongoDB();
        const updatedUser = await User.findByIdAndUpdate(userId, userData, {
            new: true, // To return the updated document
            runValidators: true, // To run the validators defined in the Event model
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(updatedUser);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message, msg: "Something went wrong!" });
    }
}
