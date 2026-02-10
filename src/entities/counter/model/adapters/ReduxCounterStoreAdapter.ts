import type { Store } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import type { ICounterStore } from "../ICounterStore";
import { setStep, setValue } from "../counterStore/counterSlice";

/**
 * Адаптер: Redux Store → ICounterStore.
 * Только маппинг get/set на state и dispatch; логики нет.
 */
export class ReduxCounterStoreAdapter implements ICounterStore {
  constructor(private readonly store: Store<RootState>) {}

  getValue(): number {
    return this.store.getState().counter.value;
  }

  getStep(): number {
    return this.store.getState().counter.step;
  }

  setValue(value: number): void {
    this.store.dispatch(setValue(value));
  }

  setStep(step: number): void {
    this.store.dispatch(setStep(step));
  }

  subscribe(listener: () => void): () => void {
    return this.store.subscribe(listener);
  }
}
