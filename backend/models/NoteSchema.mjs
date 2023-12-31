import mongoose, { Schema } from "mongoose";

const NoteSchema = new Schema({

    userId: {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});


const Note = mongoose.model('Note',NoteSchema);
export default Note;