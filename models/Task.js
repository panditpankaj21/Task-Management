import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    title: { type: String, required: true},
    description: String,
    dueDate: Date,
    isCompleted: { type: Boolean, default: false }
}, {timestamps: true})

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema)

export default Task;