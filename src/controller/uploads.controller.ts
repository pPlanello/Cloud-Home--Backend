import { Request, Response } from "express";
import { ResponsePayload } from "../interface/responsePayload.interface";


export const uploadFiles = (req: Request, res: Response) => {
    const files = req.files;
    const path = req.body.path;
    
    console.log("*****************");
    console.log(files);
    console.log(req.body);

    const responsePayload: ResponsePayload = {
        sucesss: true,
        payload: {
            files
        }
    }

    res.json(responsePayload);
}