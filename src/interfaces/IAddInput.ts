export interface IAddInput {
  findTitle: (title: string) => void;
  add: () => Promise<void>;
}
