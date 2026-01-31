import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, userEvent, fireEvent } from "@/testing/test-utils";
import { store } from "@/app/store";
import { setValue, setStep } from "../model/counterStore/counterSlice";
import { CounterView } from "./CounterView";

const user = userEvent.setup();

describe("CounterView", () => {
  beforeEach(() => {
    store.dispatch(setValue(0));
    store.dispatch(setStep(1));
  });

  it("renders counter title and initial value", () => {
    render(<CounterView />);
    expect(
      screen.getByRole("heading", { name: /counter/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/value: 0/i)).toBeInTheDocument();
  });

  it("increment button increases value", async () => {
    render(<CounterView />);
    await user.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByText(/value: 1/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByText(/value: 2/i)).toBeInTheDocument();
  });

  it("decrement button is disabled when value is 0", () => {
    render(<CounterView />);
    expect(screen.getByRole("button", { name: "-" })).toBeDisabled();
  });

  it("decrement button decreases value when value > 0", async () => {
    render(<CounterView />);
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "-" }));
    expect(screen.getByText(/value: 0/i)).toBeInTheDocument();
  });

  it("reset button restores initial state", async () => {
    render(<CounterView />);
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByText(/value: 0/i)).toBeInTheDocument();
  });

  it("step input updates step and affects increment", async () => {
    render(<CounterView />);
    const stepInput = screen.getByRole("spinbutton", { name: /step/i });
    fireEvent.change(stepInput, { target: { value: "5" } });
    await user.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByText(/value: 5/i)).toBeInTheDocument();
  });
});
