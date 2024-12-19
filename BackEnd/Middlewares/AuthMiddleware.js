import jwt from "jsonwebtoken";
import user from "../Models/UserModel.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(400);
    throw new Error("Not authenticated");
  }

  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = await user.findById(decoded.userId).select("-password")
    // console.log(req.user)
    next();
  } catch (error) {
    res.status(400);
    throw new Error("Invaild Token");
  }
};

export { authMiddleware };
