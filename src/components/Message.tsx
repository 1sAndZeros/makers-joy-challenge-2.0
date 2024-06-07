import uEmojiParser from "universal-emoji-parser";

import { FC } from "react";
import { SubHeading } from "@/components";

const Message: FC<{ message: string }> = ({ message }) => {
  return (
    <div className="message">
      <SubHeading text="Message" />
      <p>{uEmojiParser.parseToUnicode(message)}</p>
    </div>
  );
};

export default Message;
