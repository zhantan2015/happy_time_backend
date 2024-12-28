import { Router } from "express";
import userController from "../controller/userController"

const router = Router()

router.get('/', userController.get)
router.post('/', userController.post)

export default router