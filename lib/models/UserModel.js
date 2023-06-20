import {Schema, model, models} from "mongoose";

const userSchema = new Schema({
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        birthdate: {
            type: Date,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {collection: "user"}
);

const User = models.User || model("User", userSchema)

export default User;