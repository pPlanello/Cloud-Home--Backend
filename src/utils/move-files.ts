import path from "path"
import fs  from "fs";
import { UploadedFile } from "express-fileupload";


export const moveFiles = async (file: UploadedFile, storagePath: string) => {
    file.name = file.name.replace(" ", "_");
    const filePath = path.join(storagePath, file.name);
    
    return new Promise((resolve, reject) => {
        fs.promises.access(filePath)
            .then(() => {
                reject({ alreadyExist: true, nameFile: file.name });
            })
            .catch(() => {
                file.mv(filePath, (error) => {
                    if (error) {
                        reject({ alreadyExist: false, nameFile: file.name });
                    }
                    resolve(`File ${file.name} upload correcty`);
                });
            });
    });
}