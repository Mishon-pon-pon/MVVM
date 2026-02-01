import type { ComponentPropsWithoutRef, ElementType } from "react";
import React, { forwardRef } from "react";

type ButtonOwnProps<T extends ElementType = ElementType> = {
  as?: T;
  variant?: "primary" | "secondary";
  children?: React.ReactNode;
};
type ButtonProps<T extends ElementType> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>;

type ButtonComponent = <T extends ElementType = "button">(
  props: ButtonProps<T> & { ref?: React.Ref<any> }
) => React.ReactElement | null;

export const Button = React.memo(
  forwardRef(function ButtonInner<T extends ElementType = "button">(
    { as, children, ...rest }: ButtonProps<T>,
    ref: React.Ref<any>
  ) {
    const Component = as || "button";
    let className = "";

    switch (Component) {
      case "button":
        className =
          "px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400";
        break;
      case "a":
        className = `
    inline-flex items-center gap-1
    text-sky-600 underline-offset-4
    hover:text-sky-700 hover:underline
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2
    transition-colors
  `;
        break;
      default:
        className = "";
    }

    return (
      <Component className={className} ref={ref} {...rest}>
        {children}
      </Component>
    );
  }) as ButtonComponent
);

Button.displayName = "Button";
