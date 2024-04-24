import { Router } from "express";
import { handlegetBackblazeAuthorization,handlegetBackblazeUploadFile,handlegetBackblazeCreateServer } from "../controllers/backblaze";
import { PrismaClient } from '@prisma/client'        
const prisma = new PrismaClient()




const router = Router();




router.get("/authorize",handlegetBackblazeAuthorization)
router.get("/upload",handlegetBackblazeUploadFile)




router.post("/create/bucket",handlegetBackblazeCreateServer)


module.exports = router;