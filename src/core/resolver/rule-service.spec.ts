import { Test, TestingModule } from "@nestjs/testing";
import { RuleService } from "./rule-service";
import { RequestResolver } from "./request-resolver";
import { LoggerService } from "../../logger/logger.service";
import { RequestMapper } from "./request.mapper";
import { of, throwError } from "rxjs";
import { PathInfoDTO } from "../../contracts/common";
import { SmartLinkRequest } from "../common/smart-link-request";

describe("RuleService", () => {
  let ruleService: RuleService;
  let requestResolver: RequestResolver;
  let loggerService: LoggerService;
  let requestMapper: RequestMapper;

  const mockPathInfoDTO: PathInfoDTO = {
    path: "/example/path",
    domain: "example.com",
  };

  const mockSmartLinkRequest: SmartLinkRequest = new SmartLinkRequest();
  mockSmartLinkRequest.set('path', '/example/path');
  mockSmartLinkRequest.set('domain', 'example.com');

  const mockRulesInfo = { redirectUrl: "https://redirected.com" };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RuleService,
        {
          provide: RequestResolver,
          useValue: {
            resolve: jest.fn().mockReturnValue(mockRulesInfo),
          },
        },
        {
          provide: LoggerService,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
          },
        },
        {
          provide: RequestMapper,
          useValue: {
            pathInfoDTOToSmartLinkRequest: jest.fn(),
          },
        },
      ],
    }).compile();

    ruleService = module.get<RuleService>(RuleService);
    requestResolver = module.get<RequestResolver>(RequestResolver);
    loggerService = module.get<LoggerService>(LoggerService);
    requestMapper = module.get<RequestMapper>(RequestMapper);
  });

  it("RuleService должен быть определен и разрешаем из модуля тестового приложения через module.get<RuleService>(RuleService);", () => {
    expect(ruleService).toBeDefined();
  });

  it("При вызове ruleService.resolve(...) должна быть выполнена запись в лог и метод должен вернуть rulesInfo, если выполнился успешно", async () => {
    const logSpy = jest.spyOn(loggerService, "log");
    const resolveSpy = jest.spyOn(requestResolver, "resolve");
    const dtoToRequestSpy = jest.spyOn(requestMapper, "pathInfoDTOToSmartLinkRequest").mockReturnValue(mockSmartLinkRequest);

    const result = await ruleService.resolve(mockPathInfoDTO);

    expect(logSpy).toHaveBeenCalledWith("invoked method resolve()");
    expect(dtoToRequestSpy).toHaveBeenCalledWith(mockPathInfoDTO);
    expect(resolveSpy).toHaveBeenCalledWith(mockSmartLinkRequest);
    expect(result).toEqual(mockRulesInfo);
    dtoToRequestSpy.mockRestore();
  });

  it("При вызове ruleService.resolve(...) должна быть залогирована ошибка и метод должен вернуть неопределенное значение undefined, если в методе было выпущено исключение", async () => {
    const errorSpy = jest.spyOn(loggerService, "error");
    const dtoToRequestSpy = jest
      .spyOn(requestMapper, "pathInfoDTOToSmartLinkRequest")
      .mockReturnValue(mockSmartLinkRequest);
    jest.spyOn(requestResolver, "resolve").mockReturnValue(Promise.reject(new Error("Test error")));

    const result = await ruleService.resolve(mockPathInfoDTO);

    expect(dtoToRequestSpy).toHaveBeenCalledWith(mockPathInfoDTO);
    expect(errorSpy).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

});
