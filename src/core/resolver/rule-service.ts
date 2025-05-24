import { Injectable } from "@nestjs/common";
import { LoggerService } from "../../logger/logger.service";
import { PathInfoDTO } from "../../contracts/common";
import { PathRulesRepository } from "../../database/path-rules/path-rules.repositry";    

@Injectable()
export class RuleService {
	constructor(
		private readonly pathRulesRepository: PathRulesRepository,
		private readonly loggerService: LoggerService,
	) {
  }

	async resolve(data: PathInfoDTO): Promise<any>{
    this.loggerService.log('invoked method resolve()');
		const rulesInfo = await this.pathRulesRepository.findRules(data.path);
		if(!rulesInfo || !rulesInfo.rules){
			return Promise.resolve(null);
		}
		if(rulesInfo.rules.length === 0){
			return Promise.resolve(null);
		}
		// TODO: choose rule
		// ...

		return Promise.resolve(rulesInfo.rules[0]);
	}
}
