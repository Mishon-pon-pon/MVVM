/**
 * Порт хранилища — только чтение/запись value и step.
 * Бизнес-логики нет: это «тупое» хранилище для модели.
 */
export interface ICounterStore {
  getValue(): number;
  getStep(): number;
  setValue(value: number): void;
  setStep(step: number): void;
  subscribe(listener: () => void): () => void;
}
