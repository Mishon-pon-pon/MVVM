/**
 * Пример адаптера для MobX.
 * Порт ICounterStore — только getValue, getStep, setValue, setStep, subscribe.
 * Бизнес-логика (increment, decrement, reset) остаётся в CounterModel.
 *
 * import { makeAutoObservable } from "mobx";
 * import type { ICounterStore } from "../ICounterStore";
 *
 * class CounterStore {
 *   value = 0;
 *   step = 1;
 *   constructor() { makeAutoObservable(this); }
 *   getValue() { return this.value; }
 *   getStep() { return this.step; }
 *   setValue(v: number) { this.value = v; }
 *   setStep(s: number) { this.step = s; }
 *   subscribe(listener: () => void) {
 *     // mobx.reaction(() => ({ value: this.value, step: this.step }), listener);
 *     return () => {};
 *   }
 * }
 *
 * export class MobXCounterStoreAdapter implements ICounterStore {
 *   constructor(private store: CounterStore) {}
 *   getValue() { return this.store.getValue(); }
 *   getStep() { return this.store.getStep(); }
 *   setValue(v: number) { this.store.setValue(v); }
 *   setStep(s: number) { this.store.setStep(s); }
 *   subscribe(l: () => void) { return this.store.subscribe(l); }
 * }
 */

export {};
