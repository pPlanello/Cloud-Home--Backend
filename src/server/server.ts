import express, {Application} from "express";
import userRouter from "../router/example.router";
import cors from "cors";

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.configRoutes();
        this.middlewares();
    }

    private configRoutes() {
        this.app.use('/api/examples', userRouter);
    }

    private middlewares() {
        // CORS
        this.app.use(cors());
        // Ready body
        this.app.use(express.json());
        // Read public folder
        this.app.use(express.static(__dirname+'/../public'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running at port: ', this.port);
        });
    }
}

export default Server;