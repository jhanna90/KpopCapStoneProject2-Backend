const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

function authenticateJWT(req, res, next) {
    try {
        // Extract the token from the request body
        // const token = req.body.token;

        const token = req.headers.authorization.split(' ')[1];
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Log the decoded token payload
        console.log(decoded);

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
