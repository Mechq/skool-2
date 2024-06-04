const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ status: 401, message: 'Unauthorized' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ status: 403, message: 'Forbidden' });
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = authMiddleware;
