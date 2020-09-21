export interface IBaseRepository {
  Init: () => Promise<void>;
}
export interface IModule extends IBaseRepository {
  RunTimer: () => Promise<void>;
}
