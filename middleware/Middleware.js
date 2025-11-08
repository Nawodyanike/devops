const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try{

        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({'message': 'header is missing'});
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({'message': 'token is missing'});
        }

        jwt.verify(token, process.env.JWT_SECRET);
        req.userEmail = decoded.email;
        next();
    }
    catch(e)
    {
        res.status(401).json({'message': 'invalid or expired token', error : e});
        
    }
}

module.exports = authMiddleware;