var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import user from "../model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = req.body;
    const password = yield bcrypt.hash(req.body.password, 8);
    const checkUsername = yield user.findOne({ username: username });
    const checkEmail = yield user.findOne({ email: email });
    if (checkUsername || checkEmail) {
        res
            .status(400)
            .json({ status: "error", massage: "username or email is already used" });
        return;
    }
    const newUser = new user({
        username,
        email,
        password,
    });
    yield newUser.save();
    res
        .status(201)
        .json({ status: "success", data: { message: "user have been created" } });
});
export const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    let ckeckUser;
    if (!username || !password) {
        res
            .status(400)
            .json({ status: "error", massage: "username and password are required" });
        return;
    }
    if (username.includes("@") && username.includes(".")) {
        ckeckUser = yield user.findOne({ email: username });
    }
    else {
        ckeckUser = yield user.findOne({ username: username });
    }
    if (!ckeckUser) {
        res.status(400).json({
            status: "error",
            massage: "username or password not valid try again",
        });
        return;
    }
    const matchedPassword = yield bcrypt.compare(password, ckeckUser.password);
    if (ckeckUser && matchedPassword) {
        const accesstoken = jwt.sign({ id: ckeckUser._id, username: ckeckUser.username }, process.env.SECRET_KEY, { expiresIn: "1d" });
        const refreshToken = jwt.sign({ id: ckeckUser._id, username: ckeckUser.username }, process.env.SECRET_KEY, { expiresIn: "10d" });
        const setrefreshToken = yield user.updateOne({ username: username }, { $set: { refreshToken } });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
        });
        res.json({ status: "success", data: { accesstoken } });
    }
    else {
        res.status(400).json({
            status: "error",
            massage: "username or password not valid try again",
        });
        return;
    }
});
export const getProductsCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userData = req === null || req === void 0 ? void 0 : req.user;
    const products = yield user.findOne({ _id: userData.id }, { cart: 1, _id: 0 });
    res.json({
        status: "success",
        data: products === null || products === void 0 ? void 0 : products.cart,
        newToken: (_a = res === null || res === void 0 ? void 0 : res.locals) === null || _a === void 0 ? void 0 : _a.authenticated,
    });
});
export const setProductCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userData = req === null || req === void 0 ? void 0 : req.user;
    const product = req.body;
    const data = yield user.findOne({ _id: userData.id }, { cart: 1, _id: 0 });
    const check = data.cart.find((ele) => ele.id === product.id);
    if (!check && product) {
        data.cart.push(product);
        yield user.updateOne({ _id: userData.id }, { $set: { cart: data.cart } });
    }
    else if (check && product) {
        for (let i = 0; i < data.cart.length; i++) {
            if (data.cart[i].id === product.id) {
                data.cart[i].price += product.price;
                data.cart[i].amount += product.amount;
            }
        }
        yield user.updateOne({ _id: userData.id }, { $set: { cart: data.cart } });
    }
    res.status(200).json({
        status: "success",
        data: data === null || data === void 0 ? void 0 : data.cart,
        newToken: (_b = res === null || res === void 0 ? void 0 : res.locals) === null || _b === void 0 ? void 0 : _b.authenticated,
    });
});
export const deleteProductCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userData = req === null || req === void 0 ? void 0 : req.user;
    const productId = req.params.id;
    const { cart } = yield user.findOne({ _id: userData.id }, { cart: 1, _id: 0 });
    const filtered = cart.filter((item) => (item === null || item === void 0 ? void 0 : item.id) !== productId);
    yield user.updateOne({ _id: userData.id }, { $set: { cart: filtered } });
    res.status(200).json({
        status: "success",
        data: filtered,
        newToken: (_c = res === null || res === void 0 ? void 0 : res.locals) === null || _c === void 0 ? void 0 : _c.authenticated,
    });
});
export const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const userData = req === null || req === void 0 ? void 0 : req.user;
    const user_info = yield user.findOne({ _id: userData.id }, { _id: 0, username: true, email: true });
    res.json({
        status: "success",
        data: user_info,
        newToken: (_d = res === null || res === void 0 ? void 0 : res.locals) === null || _d === void 0 ? void 0 : _d.authenticated,
    });
});
export const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req === null || req === void 0 ? void 0 : req.user;
    yield user.deleteOne({ _id: userData.id });
    res.json({
        status: "success",
        data: { message: "user have been deleted" },
    });
});
export const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("refreshToken", { path: "/" });
    res.json({ status: "success", data: { message: "user logged out" } });
});
//# sourceMappingURL=userControler.js.map