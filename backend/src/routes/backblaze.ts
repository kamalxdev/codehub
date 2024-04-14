import { Router } from "express";
import { handlegetBackblazeAuthorization } from "../controllers/backblaze";



const router = Router();




router.get("/authorize",handlegetBackblazeAuthorization)



module.exports = router;