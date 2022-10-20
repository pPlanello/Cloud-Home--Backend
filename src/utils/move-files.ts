import path from "path"
import fs  from "fs";
import { UploadedFile } from "express-fileupload";


export const moveFiles = async (file: UploadedFile, storagePath: string) => {
    
    const filePath = path.join(storagePath, file.name);

    
    return new Promise((resolve, reject) => {
        fs.promises.access(filePath)
            .then(() => {
                reject(new Error(`File ${file.name} already exists`))
            })
            .catch(() => {
                file.mv(filePath, (error) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(`File ${file.name} upload correcty`);
                });
            });
    });
}