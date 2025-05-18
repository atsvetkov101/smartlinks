
import sinon from 'sinon';
import { SmartLinkResponse } from '../../src/core/common/smart-link-response';


const mockSmartLinkResponse: Partial<SmartLinkResponse> = {
  get: sinon.stub(),
  set:sinon.stub()
};

export default mockSmartLinkResponse;