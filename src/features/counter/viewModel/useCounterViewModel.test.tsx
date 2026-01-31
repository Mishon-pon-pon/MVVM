import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { reset } from "../model/counterSlice";
import { useCounterViewModel } from "./useCounterViewModel";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe("useCounterViewModel", () => {
  beforeEach(() => {
    store.dispatch(reset());
  });

  it("returns initial value and step", () => {
    const { result } = renderHook(() => useCounterViewModel(), { wrapper });
    expect(result.current.value).toBe(0);
    expect(result.current.step).toBe(1);
    expect(result.current.canDecrement).toBe(false);
  });

  it("increment increases value", () => {
    const { result } = renderHook(() => useCounterViewModel(), { wrapper });
    act(() => result.current.increment());
    expect(result.current.value).toBe(1);
    act(() => result.current.increment());
    expect(result.current.value).toBe(2);
  });

  it("decrement decreases value when value > 0", () => {
    const { result } = renderHook(() => useCounterViewModel(), { wrapper });
    act(() => result.current.increment());
    act(() => result.current.increment());
    act(() => result.current.decrement());
    expect(result.current.value).toBe(1);
  });

  it("canDecrement is false when value is 0", () => {
    const { result } = renderHook(() => useCounterViewModel(), { wrapper });
    expect(result.current.canDecrement).toBe(false);
  });

  it("canDecrement is true when value > 0", () => {
    const { result } = renderHook(() => useCounterViewModel(), { wrapper });
    act(() => result.current.increment());
    expect(result.current.canDecrement).toBe(true);
  });

  it("setStep updates step", () => {
    const { result } = renderHook(() => useCounterViewModel(), { wrapper });
    act(() => result.current.setStep(5));
    expect(result.current.step).toBe(5);
    act(() => result.current.increment());
    expect(result.current.value).toBe(5);
  });

  it("reset restores initial state", () => {
    const { result } = renderHook(() => useCounterViewModel(), { wrapper });
    act(() => result.current.setStep(3));
    act(() => result.current.increment());
    act(() => result.current.reset());
    expect(result.current.value).toBe(0);
    expect(result.current.step).toBe(1);
  });
});
