import { useCallback, useMemo, useSyncExternalStore } from "react";
import { store } from "@/app/store";
import { CounterModel } from "../model/CounterModel";
import { ReduxCounterStoreAdapter } from "../model/adapters/ReduxCounterStoreAdapter";

const adapter = new ReduxCounterStoreAdapter(store);
const model = new CounterModel(adapter);

function getSnapshot(): { value: number; step: number; canDecrement: boolean } {
  const value = adapter.getValue();
  const step = adapter.getStep();
  const canDecrement = value > 0;
  return { value, step, canDecrement };
}

function subscribe(callback: () => void): () => void {
  return adapter.subscribe(callback);
}

/** Кэш снапшота: новая ссылка только при изменении value/step. */
function getCachedSnapshot() {
  const next = getSnapshot();
  const cache = getCachedSnapshot.cache;
  if (
    cache &&
    cache.value === next.value &&
    cache.step === next.step &&
    cache.canDecrement === next.canDecrement
  ) {
    return cache;
  }
  getCachedSnapshot.cache = next;
  return next;
}
getCachedSnapshot.cache = null as {
  value: number;
  step: number;
  canDecrement: boolean;
} | null;

/**
 * ViewModel: модель независима от Redux; адаптер подключается здесь.
 * Колбэки стабильны (useCallback), чтобы кнопки не ре-рендерились лишний раз.
 */
export const useCounterViewModel = () => {
  const { value, step, canDecrement } = useSyncExternalStore(
    subscribe,
    getCachedSnapshot,
    getCachedSnapshot
  );

  const increment = useCallback(() => model.increment(), []);
  const decrement = useCallback(() => model.decrement(), []);
  const setStepCb = useCallback((next: number) => model.setStep(next), []);
  const reset = useCallback(() => model.reset(), []);

  return useMemo(
    () => ({
      value,
      step,
      canDecrement,
      increment,
      decrement,
      setStep: setStepCb,
      reset,
    }),
    [value, step, canDecrement, increment, decrement, setStepCb, reset]
  );
};
