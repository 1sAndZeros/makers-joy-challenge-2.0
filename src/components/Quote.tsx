import { FC } from "react";
import { SubHeading } from "@/components";

interface Props {
  quote: {
    message: string;
    name?: string;
  };
}

const Quote: FC<Props> = ({ quote }) => {
  if (quote.message)
    return (
      <blockquote>
        <SubHeading text="Quote" />
        <p style={{ fontStyle: "italic" }}>
          <span>“ </span>
          {quote.message}
          <span> ”</span>
        </p>
        <p style={{ fontSize: "1.5rem" }}>
          <span>- </span>
          {quote.name || "Unknown"}
        </p>
      </blockquote>
    );
};

export default Quote;
