import { Router } from "express";
import {handleGetFileById,handleGetAllBuckets,handleGetBucket, handlegetBackblazeAuthorization,handlegetBackblazeUploadFile,handlegetBackblazeCreateServer } from "../controllers/backblaze";
import { PrismaClient } from '@prisma/client'        
import jwt from "jsonwebtoken";




const router = Router();
const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET as string;

type iJWTdata = {name:string,email:string}



router.get("/authorize",handlegetBackblazeAuthorization)


router.use(async (req,res,next)=>{
    const userAuthorizationToken = req.headers.authorization as string;
    const accountAuthorizationToken = req.headers
    .accountauthorizationtoken as string;
    if (!userAuthorizationToken) {
        return res.json({ message: "Authorization token missing from header", status: 400 });
    }
    if (!accountAuthorizationToken) {
        return res.json({
          message: "Account authorization token missing",
          status: 400,
        });
      }
    // verify the user token
    jwt.verify(userAuthorizationToken, SECRET, async (err, decoded) => {
    if (err) {
      return res.status(200).json({ message: "Invalid User", status: 400 });
    }

    // check if the user exists
    await prisma.user.findUnique({
        where: {
            email: (decoded as iJWTdata)?.email as string,
        },
    }).then((data)=>{
        if(!data){
            return res.status(200).json({ message: "User not found", status: 400 });
        }
        res.locals.user=data;
        res.locals.accountAuthorizationToken=accountAuthorizationToken;
        next()
    }).catch((err)=>{
        console.log("Error on finding user", err);
        return res.status(200).json({ message: "Error on finding user", status: 400 });
    })
  });
})
router.get("/upload",handlegetBackblazeUploadFile)
router.post("/bucket",handlegetBackblazeCreateServer)
router.get("/bucket",handleGetAllBuckets)
router.get("/bucket/:id",handleGetBucket)
router.get("/file/:id",handleGetFileById)





module.exports = router;