import mongoose from "mongoose";
const playerModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    info: {
        type: Array,
        required: true,
    },
});
const player = mongoose.model("player", playerModelSchema);
export default player;
//# sourceMappingURL=index.js.map