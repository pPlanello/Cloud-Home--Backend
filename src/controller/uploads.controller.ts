import { Request, Response } from "express";
import { ErrorSaveFile } from "../interface/error-save-file.interface";
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

    // TODO: implement manage route user
    // const pathCloud = createPath(path, userId);
    
    let filesNames: string[] = [];

    // Storage all files
    const promiseFiles = files.map(file => {
        filesNames.push(file.name);
        return moveFiles(file, pathCloud.absolutePath)
    });

    Promise.allSettled(promiseFiles)
        .then(results => {
            const { numberUpdatedFiles, numberFiles, errors } = managePromiseSaveFiles(results, path);
            
            console.log(errors);
            
            // All files save correctly
            if (numberUpdatedFiles === numberFiles) {
                res.status(200).json({
                    message: `Files ${numberFiles}/${numberFiles} are storage in ${path}`,
                    path
                });
            } else {
                res.status(200).json({
                    message: `Files ${numberUpdatedFiles}/${numberFiles} are storage in ${path}`,
                    errors,
                    path
                });
            }
        })
        .catch(error => {
            console.log('eioryhuijfhc', error);
            
            res.status(400).json({
                sucesss: false,
                errors: error.message,
                path
            });
        });

}

function managePromiseSaveFiles(results: PromiseSettledResult<unknown>[], path: any) {
    let numberUpdatedFiles = 0;
    let numberFiles = 0;
    let errors: ErrorSaveFile[] = [];

    results.forEach(promise => {
        numberFiles += 1;

        if (promise.status === 'rejected') {
            const fileName = promise.reason['nameFile'];
            const description = promise.reason['alreadyExist'] ? 'File already exist' : `You do not have permissions to save in route ${path}`;
            errors.push({ fileName, description });
        }

        if (promise.status === 'fulfilled') {
            numberUpdatedFiles += 1;
        }

    });

    return { numberUpdatedFiles, numberFiles, errors };
}
