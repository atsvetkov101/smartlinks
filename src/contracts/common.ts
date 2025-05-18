import { IsString } from "class-validator";

export class PathInfoDTO {
	@IsString()
		path: string;

	[key: string]: string | undefined;
}