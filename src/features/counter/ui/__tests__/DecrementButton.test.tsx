import { store } from "@/app/store";
import {
  setStep,
  setValue,
} from "@/entities/counter/model/counterStore/counterSlice";
import { useCounterViewModel } from "@/entities/counter/viewModel";
import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { describe } from "vitest";
import { DecrementButton } from "../DecrimentButton";

const user = userEvent.setup();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe("DecrementButton", () => {
  beforeEach(() => {
    store.dispatch(setValue(0));
    store.dispatch(setStep(1));
  });

  it("decrement button is disable if canDecriment from store is false", async () => {
    const { result } = renderHook(() => useCounterViewModel(), { wrapper });
    store.dispatch(setValue(0));

    render(
      <DecrementButton
        canDecrement={result.current.canDecrement}
        decrement={result.current.decrement}
      />
    );

    await user.click(screen.getByRole("button", { name: "-" }));

    expect(result.current.value).toBe(0);
  });

  it("decrement button increases value", async () => {
    store.dispatch(setValue(1));
    const { result } = renderHook(() => useCounterViewModel(), { wrapper });

    render(
      <DecrementButton
        canDecrement={result.current.canDecrement}
        decrement={result.current.decrement}
      />
    );

    await user.click(screen.getByRole("button", { name: "-" }));

    expect(result.current.value).toBe(0);
  });

  it("decrement button increases value when pressed several times", async () => {
    store.dispatch(setValue(4));
    const { result } = renderHook(() => useCounterViewModel(), { wrapper });

    render(
      <DecrementButton
        canDecrement={result.current.canDecrement}
        decrement={result.current.decrement}
      />
    );

    await user.click(screen.getByRole("button", { name: "-" }));
    await user.click(screen.getByRole("button", { name: "-" }));
    await user.click(screen.getByRole("button", { name: "-" }));

    expect(result.current.value).toBe(1);
  });

  it("decrement button with step update", async () => {
    store.dispatch(setStep(10));
    store.dispatch(setValue(20));
    const { result } = renderHook(() => useCounterViewModel(), { wrapper });

    render(
      <DecrementButton
        decrement={result.current.decrement}
        canDecrement={result.current.canDecrement}
      />
    );

    await user.click(screen.getByRole("button", { name: "-" }));
    expect(result.current.value).toBe(10);
    await user.click(screen.getByRole("button", { name: "-" }));
    expect(result.current.value).toBe(0);
  });
});
