import { Injectable } from "@nestjs/common";
import { PathInfoDTO } from "../../contracts/common";
import { SmartLinkRequest } from "../common/smart-link-request";

@Injectable()
export class RequestMapper {
  
  public pathInfoDTOToSmartLinkRequest(data: PathInfoDTO): SmartLinkRequest {

    const smartLinkRequest = new SmartLinkRequest();

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            smartLinkRequest.set(key, data[key]);
        }
    }
    return smartLinkRequest;
  }
}
