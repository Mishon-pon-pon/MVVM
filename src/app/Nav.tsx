import type { FC } from "react";
import React from "react";
import { Link } from "react-router-dom";

interface IProps {}

export const Nav: FC<IProps> = React.memo(() => {
  return (
    <nav style={{ display: "flex", gap: "4px" }}>
      <Link to="/">Home</Link>
      <Link to="/counter">counter</Link>
    </nav>
  );
});

Nav.displayName = "Nav";
