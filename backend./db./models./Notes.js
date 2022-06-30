import mongoose from 'mongoose'

const Schema = mongoose.Schema;


const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    user: [{ type: mongoose.Types.ObjectId, ref: "User", required: true }], //Connect user collection with note collection
});

export default mongoose.model("Notes", noteSchema);
