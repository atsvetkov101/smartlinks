import { Injectable } from "@nestjs/common";
import { SmartLinkRequest } from "./smart-link-request";

export class SmartLinkRequestBuilder{
  private smartLinkRequest: SmartLinkRequest;
  constructor(){
    this.smartLinkRequest = new SmartLinkRequest();
  }

  append(key: string, value: any): SmartLinkRequestBuilder{
    this.smartLinkRequest.set(key, value);
    return this;
  }

  appendHeaders(headers: any): SmartLinkRequestBuilder{
    for (let key in headers) {
      this.smartLinkRequest.set(key, headers[key]);
    }
    return this;
  }

  appendDateIfNeeded(): SmartLinkRequestBuilder{
    if(!this.smartLinkRequest.get('Date')){
      this.smartLinkRequest.set('Date', (new Date()).toISOString());
    }
    return this;
  }

  
  build(): SmartLinkRequest{
      return this.smartLinkRequest;
  }
}