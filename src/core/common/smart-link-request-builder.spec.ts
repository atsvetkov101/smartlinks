import { SmartLinkRequestBuilder } from "./smart-link-request-builder";
import { SmartLinkRequest } from "./smart-link-request";

describe("SmartLinkRequestBuilder", () => {
  let builder: SmartLinkRequestBuilder;

  beforeEach(() => {
    builder = new SmartLinkRequestBuilder();
  });

  it("should create a new SmartLinkRequest instance on construction", () => {
    expect(builder.build() instanceof SmartLinkRequest).toBe(true);
  });

  it("should append a key-value pair correctly", () => {
    const key = "testKey";
    const value = "testValue";
    const result = builder.append(key, value).build();
    expect(result.get(key)).toEqual(value);
  });

  it("should append multiple headers correctly", () => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer token123"
    };
    const result = builder.appendHeaders(headers).build();
    expect(result.get("Content-Type")).toEqual(headers["Content-Type"]);
    expect(result.get("Authorization")).toEqual(headers["Authorization"]);
  });

  it("should append a Date header if it is not already present", () => {
    const result = builder.appendDateIfNeeded().build();
    expect(result.get("Date")).toBeDefined();
    const date = result.get("Date");
    expect(date).toContain("T");
    expect(date).toContain("Z");
  });

  it("should not append a Date header if it is already present", () => {
    const existingDate = "2023-01-01T00:00:00.000Z";
    builder.append("Date", existingDate);
    const result = builder.appendDateIfNeeded().build();
    expect(result.get("Date")).toEqual(existingDate);
  });

  it("should chain methods correctly", () => {
    const key1 = "key1";
    const value1 = "val1";
    const headers = {
      "key2": "val2"
    };

    const chainedResult = builder
      .append(key1, value1)
      .appendHeaders(headers)
      .appendDateIfNeeded()
      .build();

    expect(chainedResult.get(key1)).toEqual(value1);
    expect(chainedResult.get("key2")).toEqual(headers["key2"]);
    expect(chainedResult.get("Date")).toBeDefined();
  });
});
