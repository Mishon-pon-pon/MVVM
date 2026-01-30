import type { ButtonHTMLAttributes, FC } from "react";
import React from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: FC<IProps> = React.memo((props) => {
  return (
    <button
      onClick={props.onClick}
      type="button"
      className="px-4 py-2 
    rounded-md 
    bg-blue-600 text-white 
    hover:bg-blue-700 
    disabled:bg-gray-400"
    >
      {props.children}
    </button>
  );
});

Button.displayName = "Button";
