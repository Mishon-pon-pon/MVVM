import { store } from "@/app/store";
import {
  setStep,
  setValue,
} from "@/entities/counter/model/counterStore/counterSlice";
import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect } from "vitest";
import { IncrementButton } from "../IncrementButton";
import { useCounterViewModel } from "@/entities/counter/viewModel";
import { Provider } from "react-redux";

const user = userEvent.setup();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe("IncrementButton", () => {
  beforeEach(() => {
    store.dispatch(setValue(0));
    store.dispatch(setStep(1));
  });

  it("increment button increases value", async () => {
    const { result } = renderHook(() => useCounterViewModel(), { wrapper });

    render(<IncrementButton increment={result.current.increment} />);

    await user.click(screen.getByRole("button", { name: "+" }));

    expect(result.current.value).toBe(1);
  });

  it("increment button increases value when pressed several times", async () => {
    const { result } = renderHook(() => useCounterViewModel(), { wrapper });

    render(<IncrementButton increment={result.current.increment} />);

    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "+" }));

    expect(result.current.value).toBe(3);
  });

  it("increment button with step update", async () => {
    const { result } = renderHook(() => useCounterViewModel(), { wrapper });

    render(<IncrementButton increment={result.current.increment} />);

    store.dispatch(setStep(10));
    await user.click(screen.getByRole("button", { name: "+" }));

    expect(result.current.value).toBe(10);

    await user.click(screen.getByRole("button", { name: "+" }));
    expect(result.current.value).toBe(20);
  });
});
