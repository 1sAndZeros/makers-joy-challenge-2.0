import React from "react";
import { Joy } from "@/types";
import { Video, Quote, Message, Question } from "@/components";

interface Props {
  joy: Joy | null;
}

const JoyDetails: React.FC<Props> = ({ joy }) => {
  const today = new Date().toLocaleDateString("gb-GB");

  return (
    <div className="joy">
      {joy ? (
        <h2 className="mb-1">
          {joy?.date === today ? "Todays Joy" : `Joy from ${joy?.date}`}
        </h2>
      ) : (
        <h2 className="mb-1">Loading...</h2>
      )}
      {joy && (
        <>
          <p className="mb-1">
            Brought to you by <span>{joy.name}</span>
          </p>
          <Video joy={joy} embedId={joy ? joy.youtube.id : ""} />
          <Quote quote={joy.quote} />
          <Message message={joy.message} />
          {joy.question && <Question question={joy.question} />}
        </>
      )}
    </div>
  );
};
export default JoyDetails;
