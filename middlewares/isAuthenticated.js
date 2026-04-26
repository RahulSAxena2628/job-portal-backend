import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        let token;

        // ✅ Cookie
        if (req.cookies?.token) {
            token = req.cookies.token;
        }

        // ✅ Header (THIS FIXES YOUR ISSUE 🔥)
        else if (req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("DECODED:", decoded);   // 👈 add this
        req.id = decoded.userId;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid token",
            success: false
        });
    }
};

export default isAuthenticated;