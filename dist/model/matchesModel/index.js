import mongoose from "mongoose";
const matchesModelSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    numberdate: {
        type: Array,
        required: true,
    },
    homeTeam: {
        type: Object,
        required: true,
    },
    awayTeam: {
        type: Object,
        required: true,
    },
});
const matches = mongoose.model("matches", matchesModelSchema);
export default matches;
//# sourceMappingURL=index.js.map