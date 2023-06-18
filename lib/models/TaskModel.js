import {Schema, model, models} from "mongoose";

const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    }
},
    {collection: "task"}
);

const Task = models.Task || model("Task", taskSchema)

export default Task;