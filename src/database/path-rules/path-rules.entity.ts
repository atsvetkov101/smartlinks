import { v4 as uuid } from 'uuid';

import { IPathRules } from './path-rules.interface';

export class PathRulesEntity {
	path: string;
	rules: Array<object>;
	
	constructor({path, rules}) {
		this.path = path;
		this.rules = rules;
	}
}
