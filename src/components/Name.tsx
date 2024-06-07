"use client";

import { FC, ReactNode } from "react";
import { Joy } from "@/types";

interface Props {
  giver: Giver;
  handleClick?: () => void;
  children?: ReactNode;
}

type Giver = Joy | string;

const Name: FC<Props> = ({ handleClick, children, giver }) => {
  return (
    <button type="button" onClick={handleClick} className="name">
      <h3>{typeof giver === "object" ? giver.name : giver}</h3>
      {children}
    </button>
  );
};

export default Name;
