export class SmartLinkResponse {
  private data: Record<string, any>;

  constructor() {
    this.data = {};
  }

  public get url():string {

    return this.data.url;
  }
  
  public set url(value: string){
    this.data.url = value;
  }
  
  public get status():number {

    return Number.parseInt(this.data.status);
  }
  
  public set status(value: number){
    this.data.status = value.toString();
  }

  set(key: string, value: any): void {
    this.data[key] = value;
  }

  get(key: string): any {
    return this.data[key];
  }
}
