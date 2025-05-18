import { Response } from 'express';
import sinon from 'sinon';

const mockResponse: Partial<Response> = {

  redirect: sinon.stub().callsFake((status: number, url: string) => {
    return;
  })
};

export default mockResponse;
