import {
	Column,
	DataType,
	Model, Sequelize,
	Table,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { IPathRules } from './path-rules.interface';



@Table({
	tableName: 'path_rules',
	schema: 'public',
	underscored: true,
	updatedAt: false,
	timestamps: false,
})
export class PathRulesModel
	extends Model<PathRulesModel, Optional<IPathRules, 'path'>>
	implements IPathRules {
	@Column({
		type: DataType.STRING,
		primaryKey: true,
	})
		path!: string;

	@Column({ type: DataType.JSONB, allowNull: false })
		rules!: string;
}
