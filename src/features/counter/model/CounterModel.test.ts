import { describe, it, expect } from "vitest";
import { CounterModel } from "./CounterModel";
import type { ICounterStore } from "./ICounterStore";

/** Фейковое хранилище — только get/set, без логики. */
function createFakeStore(
  initial = { value: 0, step: 1 }
): ICounterStore & { state: { value: number; step: number } } {
  const state = { ...initial };
  const listeners: Array<() => void> = [];

  const notify = () => listeners.forEach((l) => l());

  return {
    state,
    getValue() {
      return state.value;
    },
    getStep() {
      return state.step;
    },
    setValue(v: number) {
      state.value = v;
      notify();
    },
    setStep(s: number) {
      state.step = s;
      notify();
    },
    subscribe(listener: () => void) {
      listeners.push(listener);
      return () => {
        const i = listeners.indexOf(listener);
        if (i >= 0) listeners.splice(i, 1);
      };
    },
  };
}

describe("CounterModel (вся бизнес-логика здесь)", () => {
  it("reads value and step from store", () => {
    const store = createFakeStore({ value: 10, step: 2 });
    const model = new CounterModel(store);

    expect(model.value).toBe(10);
    expect(model.step).toBe(2);
    expect(model.canDecrement).toBe(true);
  });

  it("increment = value + step (логика в модели)", () => {
    const store = createFakeStore({ value: 0, step: 3 });
    const model = new CounterModel(store);

    model.increment();
    expect(store.state.value).toBe(3);
    model.increment();
    expect(store.state.value).toBe(6);
  });

  it("decrement = value - step, не ниже 0", () => {
    const store = createFakeStore({ value: 5, step: 1 });
    const model = new CounterModel(store);

    model.decrement();
    expect(store.state.value).toBe(4);
    model.decrement();
    model.decrement();
    model.decrement();
    expect(store.state.value).toBe(1);
    model.decrement();
    expect(store.state.value).toBe(0);
    model.decrement(); // no-op
    expect(store.state.value).toBe(0);
  });

  it("setStep только при next > 0", () => {
    const store = createFakeStore({ value: 10, step: 1 });
    const model = new CounterModel(store);

    model.setStep(5);
    expect(store.state.step).toBe(5);
    model.setStep(0); // no-op
    expect(store.state.step).toBe(5);
    model.setStep(-1); // no-op
    expect(store.state.step).toBe(5);
  });

  it("reset = value 0, step 1", () => {
    const store = createFakeStore({ value: 100, step: 7 });
    const model = new CounterModel(store);

    model.reset();
    expect(store.state.value).toBe(0);
    expect(store.state.step).toBe(1);
  });
});
