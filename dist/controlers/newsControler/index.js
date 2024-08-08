var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import news from "../../model/newsModel/index.js";
export const getnews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const news_info = yield news.find({}, { _id: true, name: true, img: true });
    res.json({ status: "success", data: news_info });
});
export const getnew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const new_id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    if (!new_id) {
        return res.status(400).json({ status: "error", message: "id is required" });
    }
    const new_info = yield news.findOne({ _id: new_id });
    res.json({
        status: "success",
        data: new_info,
        newToken: (_b = res === null || res === void 0 ? void 0 : res.locals) === null || _b === void 0 ? void 0 : _b.authenticated,
    });
});
//# sourceMappingURL=index.js.map