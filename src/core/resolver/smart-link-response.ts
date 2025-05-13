export class SmartLinkResponse {
  private data: Record<string, any>;

  constructor() {
    this.data = {};
  }

  set(key: string, value: any): void {
    this.data[key] = value;
  }

  get(key: string): any {
    return this.data[key];
  }
}
