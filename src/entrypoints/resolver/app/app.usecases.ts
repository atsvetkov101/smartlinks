import { Injectable } from '@nestjs/common';

import { Authentication } from '../../../contracts/authentication';

const sleep = (timeout_ms) => new Promise((resolve) => setTimeout(resolve, timeout_ms));

@Injectable()
export class AppUsecases {
	constructor(
  ) {}


}
