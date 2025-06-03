import { set } from "express-http-context";

export class ResponseInfo {
  private _url: string;
  private _status: number;
  private _ruleNotFound: boolean;
  constructor(
    status: number = 200,
  )
  {}
  get url(): string {
    return this._url;
  }
  set url(url: string) {
    this._url = url;
  }
  get status(): number {
    return this._status;
  }
  set status(status: number) {
    this._status = status;
  }
  get ruleNotFound(): boolean {
    return this._ruleNotFound;
  }
  set ruleNotFound(ruleNotFound: boolean) {
    this._ruleNotFound = ruleNotFound;
  }
}