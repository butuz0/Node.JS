import { plainToInstance, ClassConstructor } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

type ReqPart = "body" | "params" | "query";
export function validateReq<Dto extends ClassConstructor<object>>(dto: Dto, reqPart: ReqPart = "body") {
    return async (req: Request, res: Response, next: NextFunction) => {
        const instance = plainToInstance(dto, req[reqPart]);
        const errors = await validate(instance);

        if (errors.length !== 0) {
            res.status(400).send(errors);
            return;
        }

        next();
    };
}
