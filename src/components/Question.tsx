import { FC } from "react";
import { SubHeading } from "@/components";

const Question: FC<{ question: string }> = ({ question }) => {
  return (
    <div className="message">
      <SubHeading text="Question" />
      <p>{question}</p>
    </div>
  );
};

export default Question;
