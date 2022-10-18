import { Response, Request } from "express";

export const getExamples = (req: Request, res: Response) => {
    res.json({
        msg: 'getExamples'
    });
}

export const getExample = (req: Request, res: Response) => {
    const {id} = req.params;

    res.json({
        msg: 'getExample',
        id
    });
}

export const postExample = (req: Request, res: Response) => {
    const {body} = req;

    res.json({
        msg: 'postExample',
        body
    });
}

export const putExample = (req: Request, res: Response) => {
    const {body} = req;
    const {id} = req.params;

    res.json({
        msg: 'putExample',
        body,
        id
    });
}

export const deleteExample = (req: Request, res: Response) => {
    const {id} = req.params;

    res.json({
        msg: 'deleteExample',
        id
    });
}