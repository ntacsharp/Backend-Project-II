const AuthService = require("../services/AuthService");

const authMiddleware = async (req, res, next) => {
    // @ts-ignore
    const accessToken = req.headers.authorization;
    if (!accessToken) {
        return res.status(401).json({ message: 'Access token is required' });
    }
    try {
        req.body.info = AuthService.extractInforFromToken(accessToken.split(' ')[1]);
    }
    catch (err) {
        return res.status(401).json({ message: err })
    }

    next();
}
module.exports = authMiddleware;