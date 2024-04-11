import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();
const SECRET = process.env.JWT_SECRET as string;
const users = {
  email: "codehub",
  password: "1234567",
};


// To verify user token 
router.get("/verify", (req, res) => {
  try {
    // const { token } = req.params;
    const token = req.headers.authtoken as string;
    if (!token) {
      return res
        .status(200)
        .json({ message: "No token provided", status: 400 });
    }
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return res.status(200).json({ message: "Invalid Token", status: 400 });
      }
      return res.status(200).json({ message: "Token is valid",decoded, status: 200 });
    });
  } catch (error) {
    console.log("Error on verify token", error);
    return res
      .status(200)
      .json({ message: "Error on verify token", status: 400 });
  }
});



router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(200)
      .json({ message: "Please enter all fields", status: 400 });
  }
  if (username === users.email && password === users.password) {
    const token = jwt.sign(
      { username, password },
      process.env.JWT_SECRET as string
    );
    return res
      .status(200)
      .json({ message: "Login Successful", token, status: 200 });
  }
  return res.status(200).json({ message: "Invalid Credentials", status: 400 });
});

module.exports = router;
