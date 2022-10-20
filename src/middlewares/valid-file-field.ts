import { NextFunction, Response, Request } from "express";


export const validFileField = (req: Request, res: Response, next: NextFunction) => {    
    
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            sucesss: false,
            message: 'The field file is mandatory.'
        } );
    }

    next();
}