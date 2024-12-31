import { Router } from "express";
import userController from "../controller/userController";
import fileUpload from "express-fileupload";

const router = Router();

router.get('/', userController.get);
router.post('/', fileUpload({
    limits: {
        fileSize: 5 * 1024 * 1024
    }
}), userController.post);

export default router