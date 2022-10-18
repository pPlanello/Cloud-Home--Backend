import { NextFunction, Request, Response } from "express";
const { validationResult } = require("express-validator");

import { ResponsePayload } from "../interface/responsePayload.interface";


export const validFields = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const responsePayload: ResponsePayload = {
            sucesss: false,
            errors
        } 
        return res.status(400).json(responsePayload);
    }

    next();
}