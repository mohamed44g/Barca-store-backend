var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import tshirts from "../../model/T-shirtsModel/index.js";
export const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = req.query;
    if (limit) {
        const limitdata = yield tshirts.aggregate([{ $sample: { size: 5 } }]);
        return res.json({ status: "success", data: limitdata });
    }
    if (!page) {
        return res
            .status(400)
            .json({ status: "error", message: "Page number is required" });
    }
    const limitProducts = 10;
    const startIndex = (+page - 1) * limitProducts;
    const products = yield tshirts.find({}).skip(startIndex).limit(limitProducts);
    res.json({ status: "success", data: products, page, limit });
});
//# sourceMappingURL=index.js.map