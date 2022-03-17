const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    url: {
        type: String
    },
    status: {
        type: String,
        enum: ["learning", "learned", "to learn"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
})

module.exports = mongoose.model("posts", PostSchema);