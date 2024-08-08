import jwt from "jsonwebtoken";
export const authenticate = (req, res, next) => {
    var _a, _b;
    const accessToken = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    const refreshToken = req.cookies["refreshToken"];
    if (!accessToken && !refreshToken) {
        return res.status(401).send("Access Denied. No token provided.");
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        if (!refreshToken) {
            return res.status(401).send("Access Denied. No refresh token provided.");
        }
        try {
            const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);
            const accessToken = jwt.sign({ user: decoded }, process.env.SECRET_KEY, {
                expiresIn: "1d",
            });
            req.user = decoded;
            res.locals.authenticated = accessToken;
            next();
        }
        catch (error) {
            return res.status(401).send("Invalid Token.");
        }
    }
};
//# sourceMappingURL=index.js.map