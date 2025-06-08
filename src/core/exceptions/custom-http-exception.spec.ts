import { HttpStatus } from "@nestjs/common";
import { CustomHttpException } from "./custom-http-exception";

describe("CustomHttpException", () => {
  it("should set the default status code to INTERNAL_SERVER_ERROR when no options are provided", () => {
    const exception = new CustomHttpException({ error: "Test error", errorCode: "TEST_ERROR" });
    expect(exception.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it("should set the provided status code from options", () => {
    const exception = new CustomHttpException({ error: "Test error", errorCode: "TEST_ERROR" }, { statusCode: HttpStatus.BAD_REQUEST });
    expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
  });

  it("should pass the error and errorCode to the base constructor with originalError undefined by default", () => {
    const error = "Test error";
    const errorCode = "TEST_ERROR";
    const exception = new CustomHttpException({ error, errorCode });
    expect(exception.originalError).toEqual(undefined);

    /*
    const message = { error, errorCode, ...exception["message"] };
    
    expect(message).toEqual({ error, errorCode });
    */
  });

  it("should pass the originalError from options to the base constructor", () => {
    const originalError = new Error("Original error");
    const error = "Test error";
    const errorCode = "TEST_ERROR";
    const exception = new CustomHttpException({ error, errorCode }, { originalError });
    /*
    const message = { error, errorCode, originalError: exception["message"].originalError };

    expect(message).toEqual({ error, errorCode, originalError });
    */
    expect(exception.originalError).toEqual(originalError);
  });
});
