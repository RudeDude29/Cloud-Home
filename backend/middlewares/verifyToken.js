const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        if (!authorization) {
            res.status(401).json({
                status: "fail",
                message: "Unauthorized",
                data: {},
            });
            return;
        }
    
        const token = authorization?.split(" ")?.[1];
        if (!token) {
            res.status(401).json({
                status: "fail",
                message: "Unauthorized",
                data: {},
            });
            return;
        }
     
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        status: "fail",
                        message: "Token expired",
                        data: {},
                    });
                }
                console.log(err);
                res.status(401).json({
                    status: "fail",
                    message: "Unauthorized",
                    data: {},
                });
            } else {
                console.log(decoded);
                req.user = { email: decoded.data.email, _id: decoded.data._id };
                next();
            }
        });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        } else {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
    }
     
}; 

module.exports = verifyToken;
