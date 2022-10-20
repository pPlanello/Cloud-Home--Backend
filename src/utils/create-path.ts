import path from "path";
import { PathCloud } from "../interface/pathCloud.interface";


export const createPath = (pathBody: string, userId?: number): PathCloud => {
    const storagePath = process.env.HOME_CLOUD_STORAGE || path.join(__dirname, '..', '..', 'storage');

    const relativePath = userId ? path.join(userId.toString(), pathBody) : pathBody;
    const absolutePath = userId ? path.join(storagePath, userId.toString(), pathBody) : path.join(storagePath, pathBody);

    return {relativePath, absolutePath};
} 