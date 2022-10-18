import { Router } from "express";
import { check } from "express-validator";

import { uploadFiles } from "../controller/uploads.controller";
import { validFields } from "../middlewares/valid-fields";
import { validFileField } from "../middlewares/valid-file-field";
import { isValidPath } from "../middlewares/valid-path";


const router = Router();

router.post('/', [
        check('path').custom(isValidPath),
        validFileField,
        validFields
    ],
    uploadFiles);

export default router;