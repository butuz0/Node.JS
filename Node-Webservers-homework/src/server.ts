import express, { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import morgan from "morgan";
import { usersController } from "./modules/users/users.controller";

export class Server {
    private port: Number;
    private app = express();

    constructor(port: Number) {
        this.port = port;
    }

    start() {
        // init senver
        // init config
        // init database
        // init global middlewares
        // init express routes
        // init error handling
        // start listening
        this.initMiddlewares();
        this.initRoutes();
        this.initErrorHandling();
        this.startListening();
    }

    private initMiddlewares() {
        this.app.use(express.json({ limit: "5mb" }));
        this.app.use(morgan("common"));
    }

    private initRoutes() {
        this.app.use("/users", usersController);
    }

    private initErrorHandling() {
        this.app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
            const statusCode = err.status || 500;
            res.status(statusCode).send({
                message: err.message,
                status: statusCode,
            });
        });
    }

    private startListening() {
        this.app.listen(this.port, () => {
            console.log(`Server started listening on port ${this.port}`);
        });
    }
}
