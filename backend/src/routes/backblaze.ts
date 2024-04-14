import { Router } from "express";
import { handlegetBackblazeAuthorization,handlegetBackblazeUploadFile } from "../controllers/backblaze";



const router = Router();




router.get("/authorize",handlegetBackblazeAuthorization)
router.get("/upload",handlegetBackblazeUploadFile)



module.exports = router;