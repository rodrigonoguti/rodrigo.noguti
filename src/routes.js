import { Router } from "express";

import CharacterController from "./controllers/CharacterController.js";
import ComicController from "./controllers/ComicController.js";

const router = Router();

const characterController = new CharacterController();
const comicController = new ComicController();

router.get("/characters", characterController.list);
router.post("/characters/import", characterController.import);
router.get("/comics/:id", comicController.execute);

export default router;