import { connectMongoDB } from "@lib/connect/MongoConnect";
import User from "@lib/models/UserModel";

export default async function handler(req, res) {
    if (req.method !== "DELETE") {
        res.status(405).send({ msg: "Only DELETE requests are allowed." });
        return;
    }

    const userId = req.query;

    try {
        await connectMongoDB();
        const findUser = await User.findById(userId)
        if (!findUser) {
            return res.status(404).json({ message: "User not found." });
        }
        const user = await User.findByIdAndDelete(userId);

        res.status(200).json({ message: "User deleted successfully." , user});
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e, message: "Internal server error." });
    }
}
