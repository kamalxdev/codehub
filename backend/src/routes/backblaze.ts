import { Router } from "express";
import { handlegetBackblazeAuthorization,handlegetBackblazeUploadFile,handlegetBackblazeCreateServer } from "../controllers/backblaze";
import { PrismaClient } from '@prisma/client'        
const prisma = new PrismaClient()




const router = Router();




router.get("/authorize",handlegetBackblazeAuthorization)
router.get("/upload",handlegetBackblazeUploadFile)


router.get("/server",async (req,res)=>{
    const body = req.body;
    if(!body.name || !body.fileid || !body.fileName){
        return res.json({message:"No body"})
    }
    await prisma.serverContent.create({
        data:{
            name:body.name,
            fileid:body.fileid,
            fileName:body.fileName,
        }
    }).then((data)=>{
        return res.json({message:"Server content created",data:data})
    }).catch((err)=>{
        console.log(err);
        
        return res.json({message:"Server content not created"})
    })
})


router.post("/create/bucket",handlegetBackblazeCreateServer)


module.exports = router;