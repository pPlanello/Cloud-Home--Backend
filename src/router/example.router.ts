import { Router } from "express";
import { deleteExample, getExample, getExamples, postExample, putExample } from "../controller/example.controller";

const router = Router();

router.get('/', getExamples);
router.get('/:id', getExample);
router.post('/', postExample);
router.put('/:id', putExample);
router.delete('/:id', deleteExample);

export default router;