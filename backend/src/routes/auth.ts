import { Router } from "express";
import {handleSigninUSER,handleVerifyUser,handleSignupUSER} from "../controllers/auth"







const router = Router();



// To verify user token 
router.get("/verify", handleVerifyUser);

router.post("/signin",handleSigninUSER);

router.post("/signup", handleSignupUSER);


module.exports = router;
