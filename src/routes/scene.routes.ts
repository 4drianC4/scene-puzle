import { Router } from "express";
import {
    getScenes,
    getSceneById,
    createScene,
    updateScene,
    deleteScene
} from "../controllers/scene.controller.js";

const router = Router();

router.get( "/list", getScenes );
router.get( "/read/:id", getSceneById );
router.post( "/write", createScene );
router.patch( "/update/:id", updateScene );
router.delete( "/delete/:id", deleteScene );

export default router;