import { NextFunction, Request, Response } from "express";
import { createPath } from "../utils/create-path";
import { moveFiles } from "../utils/move-files";


export const uploadFiles = async (req: Request, res: Response) => {
    const path = req.body.path;
    const userId = 12;

    let files = req.files!['files'];
    
    if (!Array.isArray(files)) {
        files = [files];
    }

    // Build path to storage
    const pathCloud = createPath(path);
    let filesNames = [];

    let errors: string[] = [];
    // Storage all files
    for (let file of files) {
        filesNames.push(file.name);
        moveFiles(file, pathCloud.absolutePath)
            .then(info => console.log(info))
            .catch(err =>{
                console.log('*********', err);
                errors.push(err.toString());
            });
    }

    console.error('****** ', errors)
    if (errors.length > 0) {
        res.status(400).json({
            sucesss: false,
            errors: errors,
            path
        });
    }

    res.status(200).json({
        message: `The files with the names ${filesNames} are storage in ${path}`,
        path
    });
}