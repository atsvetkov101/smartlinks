import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { PathRulesModel } from './path-rules.model';
import { PathRulesEntity } from './path-rules.entity';
import { PathRulesMapper } from './path-rules.mapper';

@Injectable()
export class PathRulesRepository {
	constructor(
		@InjectModel(PathRulesModel)
		private readonly pathRulesModel: typeof PathRulesModel,
		private readonly pathRulesMapper: PathRulesMapper
	) {
	}

	async findRules(path: string): Promise<PathRulesEntity | null>{

		const model = await this.pathRulesModel.findOne({
			where: {
				path,
			},
		});
		return model ? this.pathRulesMapper.pathRulesModelToEntity(model) : null;
	}
}
