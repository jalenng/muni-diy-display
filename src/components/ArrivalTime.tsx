import clsx from "clsx";
import Person from "../assets/person.svg?react";
import { MinuteTimeAndCrowdednessData } from "../types";

function ArrivalTime(props: MinuteTimeAndCrowdednessData) {
  const { time, crowdedness = 0 } = props;

  return (
    <span className="inline-flex flex-row items-baseline min-w-[112px]">
      {Array.from({ length: crowdedness }, (_, index) => (
        <span key={index} className="py-[2px]">
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
