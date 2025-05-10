export interface ICommand {
  execute(): Promise<void>;
  getType(): string;
}
