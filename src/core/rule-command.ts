import { Injectable, Scope } from "@nestjs/common";
import { ICommand } from "./interfaces/icommand";

export class RuleCommand implements ICommand{
  constructor(private readonly data: object) {}

  execute(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getType(): string {
    return "RuleCommand";
  }
  
}