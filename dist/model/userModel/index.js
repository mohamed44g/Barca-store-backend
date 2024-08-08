import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "name is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    refreshToken: {
        type: String,
    },
    cart: {
        type: Array,
        default: [],
    },
});
const user = mongoose.model("user", userSchema);
export default user;
//# sourceMappingURL=index.js.map