import { useMemo } from "react";
import ArrivalTime from "./ArrivalTime";
import { TimeAndCrowdednessData } from "../types";

interface ArrivalTimesProps {
  data: TimeAndCrowdednessData[];
}

function ArrivalTimes(props: ArrivalTimesProps) {
  const { data } = props;

  const sortedData = useMemo(
    () => data.sort((a, b) => a.time - b.time),
    [data]
  );

  return (
    <div className="inline-block whitespace-nowrap">
      {sortedData.map(({ time, crowdedness }, index) => (
        <>
          <ArrivalTime time={time} crowdedness={crowdedness} />
          {index !== data.length - 1 && (
            <span className="text-[59px] leading-none">,</span>
          )}
        </>
      ))}
      {sortedData.length > 0 && (
        <span className="pl-[20px] text-[26px]">min</span>
      )}
    </div>
  );
}

export default ArrivalTimes;
