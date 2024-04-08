// // authMiddleware.js

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { ExpressError } = require("../expressError")

function authenticateJWT(req, res, next) {
    try {
        // Extract the token from the request body
        const token = req.body.token;

        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Attach the decoded token payload to the request object for further processing
        req.user = decoded;

        // Proceed to the next middleware
        next();
    } catch (error) {
        // If token verification fails, return an Unauthorized error
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}


module.exports = {
    authenticateJWT
};
