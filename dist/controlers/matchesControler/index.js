var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import matches from "../../model/matchesModel/index.js";
export const getMatches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todayDate = new Date();
    const matchesData = yield matches
        .find({ numberdate: { $gte: +todayDate } })
        .limit(5);
    res.status(200).json(matchesData);
});
//# sourceMappingURL=index.js.map
