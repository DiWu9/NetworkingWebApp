const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    pid: {
        type: Number,
        required: [true, "pid is required"],
    },
    author: {
        type: String,
        required: [true, "Author is required"],
    },
	text: {
        type: String,
        required: [true, "Text is required"],
    },
	date: {
        type: Date,
        required: [true, "Date is required"],
    },
	comments: {
        type: Array,
        required: [true, "Comments is required"],
    }
});

module.exports = articleSchema;