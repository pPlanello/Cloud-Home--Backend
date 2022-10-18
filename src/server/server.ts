import express, {Application} from "express";
import cors from "cors";
import uploadsRouter from "../router/uploads.router";
import fileUpload from "express-fileupload";
// import multipart from "connect-multiparty";

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.middlewares();
        this.configureFiles();
        this.configRoutes();
    }

    private configRoutes() {
        this.app.use('/api/uploads', uploadsRouter);
    }

    private middlewares() {
        // CORS
        this.app.use(cors());
        // Ready body
        this.app.use(express.json());
        // Read public folder
        this.app.use(express.static(__dirname+'/../public'));
    }

    private configureFiles() {
        // Use files
        this.app.use(fileUpload());
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running at port: ', this.port);
        });
    }
}

export default Server;