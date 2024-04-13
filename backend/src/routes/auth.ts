import { Router } from "express";
import jwt from "jsonwebtoken";
import {handleSigninUSER,handleVerifyUser,handleSignupUSER} from "../controllers/auth"






const router = Router();
const SECRET = process.env.JWT_SECRET as string;



// To verify user token 
router.get("/verify", handleVerifyUser);

router.post("/signin",handleSigninUSER);

router.post("/signup", handleSignupUSER);

module.exports = router;
