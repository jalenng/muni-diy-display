import clsx from "clsx";
import Person from "../assets/person.svg?react";
import { TimeAndCrowdednessData } from "../types";

function ArrivalTime(props: TimeAndCrowdednessData) {
  const { time, crowdedness = 0 } = props;

  return (
    <span className="inline-flex flex-row items-baseline min-w-[112px]">
      {Array.from({ length: crowdedness }, (_, index) => (
        <span key={index}>
          <Person />
        </span>
      ))}

      <span
        className={clsx(
          "grow text-[104px] text-right font-normal leading-none",
          {
            // TODO: find correct color
            "text-[#008546]": time === 0,
            "text-black": time !== 0,
          }
        )}
      >
        {time}
      </span>
    </span>
  );
}

export default ArrivalTime;
