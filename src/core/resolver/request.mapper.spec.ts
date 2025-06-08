import { RequestMapper } from "./request.mapper";
import { PathInfoDTO } from "../../contracts/common";
import { SmartLinkRequest } from "../common/smart-link-request";

describe("RequestMapper", () => {
  let requestMapper: RequestMapper;

  beforeEach(() => {
    requestMapper = new RequestMapper();
  });

  it("should map PathInfoDTO to SmartLinkRequest", () => {
    const input: PathInfoDTO = {
      path: "/example-path",
      domain: "example.com",
      headers: { "Content-Type": "application/json" }
    };

    const result = requestMapper.pathInfoDTOToSmartLinkRequest(input);
    expect(result instanceof SmartLinkRequest).toBe(true);
    expect(result.get("path")).toBe(input.path);
    expect(result.get("domain")).toBe(input.domain);
    expect(result.get("headers")).toEqual(input.headers);
  });

  it("should handle empty PathInfoDTO by mapping to SmartLinkRequest with default values", () => {
    const input: PathInfoDTO = {};

    const result = requestMapper.pathInfoDTOToSmartLinkRequest(input);
    expect(result instanceof SmartLinkRequest).toBe(true);
  });

  it("should not map non-own properties", () => {
    const input: any = {
      path: "/custom-path",
      toString: "mock string" // This is a non-own property in most objects
    };
    const result = requestMapper.pathInfoDTOToSmartLinkRequest(input);
    expect(result.get("path")).toBe(input.path);
    expect(result.get("toString")).toBe(input.toString);
  });
});
