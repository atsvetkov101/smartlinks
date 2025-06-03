import { Injectable } from "@nestjs/common";
import { PathRulesModel } from "./path-rules.model";
import { PathRulesEntity } from "./path-rules.entity";

@Injectable()
export class PathRulesMapper {
  public pathRulesModelToEntity(model: PathRulesModel): PathRulesEntity {
    const {
      path, rules
    } = model;

    const rulesArray = rules['rules'] as Array<object>;
    return new PathRulesEntity({
      path, rules: rulesArray
    });
  }
}
