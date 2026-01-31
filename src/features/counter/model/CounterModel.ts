import type { ICounterStore } from "./ICounterStore";

/**
 * Вся бизнес-логика счётчика — в одном месте.
 * Хранилище (порт) только get/set value и step; модель решает, как их менять.
 */
export class CounterModel {
  constructor(private readonly store: ICounterStore) {}

  get value(): number {
    return this.store.getValue();
  }

  get step(): number {
    return this.store.getStep();
  }

  get canDecrement(): boolean {
    return this.value > 0;
  }

  increment(): void {
    this.store.setValue(this.store.getValue() + this.store.getStep());
  }

  decrement(): void {
    if (!this.canDecrement) return;
    this.store.setValue(this.store.getValue() - this.store.getStep());
  }

  setStep(next: number): void {
    if (next <= 0) return;
    this.store.setStep(next);
  }

  reset(): void {
    this.store.setValue(0);
    this.store.setStep(1);
  }
}
