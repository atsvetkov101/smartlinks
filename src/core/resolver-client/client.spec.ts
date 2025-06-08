import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { LoggerService } from '../../logger/logger.service';
import { AxiosHeaders } from 'axios';

import { ResolverClient } from './client';
import { SmartLinkRequest } from '../common/smart-link-request';
import { SmartLinkResponse } from '../common/smart-link-response';

describe('ResolverClient', () => {
  let resolverClient: ResolverClient;
  let httpService: HttpService;
  let loggerService: LoggerService;

  const mockResponse = { data: { data: { url: 'https://example.com' } } };
  const mockHelloRes = { data: { message: 'Hello from resolver!' } };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
          },
        },
        {
          provide: LoggerService,
          useValue: {
            log: jest.fn(),
          },
        },
        ResolverClient,
      ],
    }).compile();

    resolverClient = module.get<ResolverClient>(ResolverClient);
    httpService = module.get<HttpService>(HttpService);
    loggerService = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(resolverClient).toBeDefined();
  });
  
describe('getHello', () => {
  it('should return a response from the resolver microservice when called', async () => {
    const getSpy = jest.spyOn(httpService, 'get');
    const mockAxiosHelloResponse = {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: new AxiosHeaders() }, // Используем AxiosHeaders
      data: mockHelloRes.data
    };

    getSpy.mockReturnValueOnce(of(mockAxiosHelloResponse));

    const result = await resolverClient.getHello();
    expect(result.data.message).toEqual(mockHelloRes.data.message);
    expect(getSpy).toHaveBeenCalledTimes(1);
  });
});

describe('resolve', () => {
  it('should process a response with a URL and return a SmartLinkResponse with proper status and redirect URL', async () => {
    const postData = new SmartLinkRequest();
    postData.set('id', 123);
    const postSpy = jest.spyOn(httpService, 'post');
    const mockAxiosResponse = {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: new AxiosHeaders() }, // Используем AxiosHeaders
      data: mockResponse.data
    };

 postSpy.mockReturnValueOnce(of(mockAxiosResponse));

    const result = await resolverClient.resolve(postData);
    expect(result).toBeInstanceOf(SmartLinkResponse);
    expect(result.url).toEqual(mockResponse.data.data.url);
    expect(result.status).toEqual(302);
    expect(loggerService.log).toHaveBeenCalledWith(
      `ResolverClient.resolve(...) 'all' from resolver : ${JSON.stringify(mockResponse.data.data)}`,
    );
    expect(postSpy).toHaveBeenCalledTimes(1);
    expect(postSpy).toHaveBeenCalledWith(
      'http://localhost:6000/api/v1/resolve',
      postData,
      { timeout: 5000 },
    );
  });

  it('should return a SmartLinkResponse with default properties when there is no URL in the response', async () => {
    const mockResponseWithoutUrl = { data: { data: { no_url_key: 'value' } } };
    const postData = new SmartLinkRequest();
    postData.set('id', 123);
    
    const postSpy = jest.spyOn(httpService, 'post');
     const mockAxiosResponseWithoutUrl = {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: new AxiosHeaders() }, // Используем AxiosHeaders
      data: mockResponseWithoutUrl.data
    };
    postSpy.mockReturnValueOnce(of(mockAxiosResponseWithoutUrl));

    const result = await resolverClient.resolve(postData);
    expect(result).toBeInstanceOf(SmartLinkResponse);
    expect(result.url).toBeUndefined();
    expect(result.status).toEqual(404);
    expect(loggerService.log).toHaveBeenCalledWith(
      `ResolverClient.resolve(...) 'all' from resolver : ${JSON.stringify(mockResponseWithoutUrl.data.data)}`,
    );
  });
});
});