import { useMemo } from "react";
import ArrivalTime from "./ArrivalTime";
import { MinuteTimeAndCrowdednessData } from "../types";

interface ArrivalTimesProps {
  data: MinuteTimeAndCrowdednessData[];
  maxNumTimes?: number;
}

function ArrivalTimes(props: ArrivalTimesProps) {
  const { data, maxNumTimes = 2 } = props;

  const shownData = useMemo(
    () => data.sort((a, b) => a.time - b.time).slice(0, maxNumTimes),
    [data, maxNumTimes]
  );

  return (
    <div className="inline-block whitespace-nowrap">
      {shownData.map(({ time, crowdedness }, index) => (
        <span key={index}>
          <ArrivalTime time={time} crowdedness={crowdedness} />
          {index !== shownData.length - 1 && (
            <span className="text-[59px] leading-none">,</span>
          )}
        </span>
      ))}
      {shownData.length > 0 && (
        <span className="pl-[20px] text-[26px]">min</span>
      )}
    </div>
  );
}

export default ArrivalTimes;
