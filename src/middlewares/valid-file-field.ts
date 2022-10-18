import { NextFunction, Response, Request } from "express";

import { ResponsePayload } from "../interface/responsePayload.interface";


export const validFileField = (req: Request, res: Response, next: NextFunction) => {    
    
    if (!req.files || Object.keys(req.files).length === 0) {
        const responsePayload: ResponsePayload = {
            sucesss: false,
            message: 'The field file is mandatory.'
        } 
        return res.status(400).json(responsePayload);
    }

    next();
}