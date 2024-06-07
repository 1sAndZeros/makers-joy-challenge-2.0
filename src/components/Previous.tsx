"use client";

import React from "react";
import { Joy } from "@/types";
import { Name } from "@/components";
import { updateSearchParams } from "@/utils";
import { useRouter } from "next/navigation";

interface Props {
  joys: Joy[];
}

const Previous: React.FC<Props> = ({ joys }) => {
  const router = useRouter();
  return (
    <div className="previous">
      <h2>Previous Joy Givers</h2>
      <div className="names-container">
        {joys.map((joy) => {
          return (
            <Name
              key={joy._id}
              giver={joy}
              handleClick={() => {
                const newURL = updateSearchParams("id", joy._id);
                router.push(newURL, { scroll: false });
              }}
            >
              <span className="date">{joy.date}</span>
            </Name>
          );
        })}
      </div>
    </div>
  );
};

export default Previous;
