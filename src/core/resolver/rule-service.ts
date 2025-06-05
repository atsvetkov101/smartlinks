import { Injectable } from "@nestjs/common";
import { LoggerService } from "../../logger/logger.service";
import { PathInfoDTO } from "../../contracts/common";
import { PathRulesRepository } from "../../database/path-rules/path-rules.repositry";    
import { RequestResolver } from "./request-resolver";
import { SmartLinkRequest } from "../common/smart-link-request";
import { RequestMapper } from "./request.mapper";

@Injectable()
export class RuleService {
	constructor(
		private readonly requestResolver: RequestResolver,
		private readonly loggerService: LoggerService,
	  private readonly requestMapper: RequestMapper
	) {
  }

	async resolve(data: PathInfoDTO): Promise<any>{
    this.loggerService.log('invoked method resolve()');
		try {
			const smartLinkRequest = this.requestMapper.pathInfoDTOToSmartLinkRequest(data);
			const rulesInfo = await this.requestResolver.resolve(smartLinkRequest);
			return Promise.resolve(rulesInfo);
		} catch (err: any) {
      this.loggerService.error(`RuleService: ${err.message} ${JSON.stringify(err)}`);
		}
	}
}
