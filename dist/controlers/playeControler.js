var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import player from "../model/playerModel";
export const getPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const player_id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    if (!player_id) {
        return res.status(400).json({ status: "error", message: "id is required" });
    }
    const player_info = yield player.findOne({ _id: player_id });
    res.json({
        status: "success",
        data: player_info,
        newToken: (_b = res === null || res === void 0 ? void 0 : res.locals) === null || _b === void 0 ? void 0 : _b.authenticated,
    });
});
export const getPlayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield player.find({}, { name: true, img: true, _id: true });
    res.json({ status: "success", data: players });
});
//# sourceMappingURL=playeControler.js.map