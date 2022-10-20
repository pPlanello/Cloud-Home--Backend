import { NextFunction, Request, Response } from "express";
const { validationResult } = require("express-validator");

export const validFields = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
            sucesss: false,
            errors
        });
    }

    next();
}