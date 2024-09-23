// Middleware to check JWT
export const checkJwt = (req, res, next) => {
    try {
        if (req.cookies.jwt) {
            next(); // Proceed to the controller if JWT is found
        } else {
            return res.status(401).json({ message: 'Unauthorized, JWT cookie not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
