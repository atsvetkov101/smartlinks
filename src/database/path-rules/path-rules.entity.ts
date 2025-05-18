import { v4 as uuid } from 'uuid';

import { IPathRules } from './path-rules.interface';

export class PathRulesEntity {
	path: string;
	rules: string;

	constructor(obj: IPathRules) {
		this.path = obj.path;
		this.rules = obj.rules;
	}
}
