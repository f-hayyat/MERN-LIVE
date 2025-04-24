const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ errorMessages: ["Unauthorized access."] });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken; // Attach user info to request object
        next();
    } catch (error) {
        return res.status(401).json({ errorMessages: ["Invalid token."] });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ errorMessages: ["Forbidden: Admin access required."] });
    }
}

module.exports = { protect, isAdmin };
