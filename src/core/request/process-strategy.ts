import { Request, Response } from "express";
import { IProcessStrategy } from "./iprocess-strategy";

export abstract class ProcessStrategy implements IProcessStrategy {
  process(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
}