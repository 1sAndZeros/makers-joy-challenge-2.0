import { FC } from "react";

const SubHeading: FC<{text: string}> = ({text}) => {
  return (
    <h3 className='subheading'>
      {text}
    </h3>
  );
}

export default SubHeading