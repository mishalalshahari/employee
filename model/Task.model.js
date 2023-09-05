var mongoose = require('mongoose');

var TaskSchema = mongoose.Schema({
    taskName: {
        type: String,
        required: true,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending","completed","inprogress","intesting","isdisabled"],
    },
    assignedTo: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
    taskDescription: {
        type: String,
        required: true,
    },
    taskDeadline: {
        type: Date,
        required: true,
        default: new Date(),
    },
    taskPriority: {
        type: String,
        default: "low",
        enum: ["low","medium","high"],
    },
});

module.exports = mongoose.model("Task", TaskSchema);