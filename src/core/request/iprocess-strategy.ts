import { Request, Response } from 'express';
export interface IProcessStrategy {
    process(req: Request, res: Response): Promise<void>;
}
