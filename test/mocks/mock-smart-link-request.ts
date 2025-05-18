
import sinon from 'sinon';
import { SmartLinkRequest } from '../../src/core/common/smart-link-request';

const mockSmartLinkRequest: Partial<SmartLinkRequest> = {
  get: sinon.stub(),
  set:sinon.stub()
};

export default mockSmartLinkRequest;