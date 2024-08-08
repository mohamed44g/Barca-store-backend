import mongoose from "mongoose";
const newsModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    info: {
        type: Array,
        required: true,
    },
});
const news = mongoose.model("news", newsModelSchema);
export default news;
//# sourceMappingURL=index.js.map