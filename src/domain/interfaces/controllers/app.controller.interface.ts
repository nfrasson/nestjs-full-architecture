export interface IAppController {
  healthCheck(): Promise<void>;
}
