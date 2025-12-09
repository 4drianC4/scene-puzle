import { Router } from "express";
import { 
    getCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
} from "../controllers/character.controller.js";

const router = Router();

router.get( "/list", getCharacters );
router.get( "/read/:id", getCharacterById );
router.post( "/write/", createCharacter );
router.patch( "/update/:id", updateCharacter );
router.delete( "/delete/:id", deleteCharacter );

export default router;