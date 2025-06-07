import { ProcessStrategy } from "./process-strategy";
import { Request, Response } from "express";

describe("ProcessStrategy", () => {
  describe("process method", () => {
    it("should throw an error when called because it's an abstract class", () => {
      const strategy = new (class extends ProcessStrategy {})();
      const req: Request = {} as Request;
      const res: Response = {} as Response;

      expect(() => strategy.process(req, res)).toThrow("Method not implemented.");
    });
  });
});
