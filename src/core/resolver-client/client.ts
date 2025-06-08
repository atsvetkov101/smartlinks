import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { Injectable } from '@nestjs/common';
import { SmartLinkRequest } from '../common/smart-link-request';
import { SmartLinkResponse } from '../common/smart-link-response';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class ResolverClient {
  private baseUrl: string = process.env.MS_RESOLVER_URL || 'http://localhost:6000';
  private timeout: number = Number(process.env.API_REQUEST_TIMEOUT_MS) || 5000;
  constructor(
    private readonly httpService: HttpService
    , private readonly loggerService: LoggerService
  ) {}

  async getHello(): Promise<any> {
    const observableRes = await this.httpService.get(
        `${this.baseUrl}/hello`,
        {
					timeout: this.timeout,
				},
    );
    const res = await firstValueFrom(observableRes);
    this.loggerService.log(
      `Получен ответ на '/hello' (микросервис resolver): ${JSON.stringify(res)}`,
    );
    return res;
  } 

  async resolve(data: SmartLinkRequest): Promise<SmartLinkResponse> {
    const observableRes = await this.httpService.post(`${this.baseUrl}/api/v1/resolve`
        , data
        , {
					timeout: this.timeout,
				});
    const res = await firstValueFrom(observableRes);
    const all = res['data']['data'];
    this.loggerService.log(`ResolverClient.resolve(...) 'all' from resolver : ${JSON.stringify(all)}`);

    const response = new SmartLinkResponse();

    if(all['url']){
      response.url = all['url'];
      response.status = 302;
    }else{
      response.status = 404;
    }
    
    return Promise.resolve(response);
  }
}
