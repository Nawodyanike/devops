const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header is missing' });
        }

        const token = authHeader.split(' ')[1]; // Format: "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: 'Token is missing' });
        }

        // ✅ Verify and decode
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Store decoded user info in request (optional)
        req.userEmail = decoded.email;

        next(); // Continue to the controller
    } catch (error) {
        return res.status(401).json({ 
            message: 'Invalid or expired token', 
            error: error.message 
        });
    }
};

module.exports = authMiddleware;
