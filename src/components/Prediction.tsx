import clsx from "clsx";
import ArrivalTimes from "../components/ArrivalTimes";
import RouteBadge from "../components/RouteBadge";
import { TimeAndCrowdednessData } from "../types";
import { RouteType } from "../types";
import { useCallback, useEffect, useState } from "react";
import { routeStyles } from "./routeStyles";

const SCREEN_CYCLE_INTERVAL = 10000;

interface PredictionProps {
  routeType: RouteType;
  routeNumber: number | string;
  direction: string;
  timeAndCrowdedness: TimeAndCrowdednessData[];
}

function Prediction(props: PredictionProps) {
  const { routeType, routeNumber, direction, timeAndCrowdedness } = props;

  const [timeInMinutesAndCrowdedness, setTimeInMinutesAndCrowdedness] =
    useState<{ time: number; crowdedness: number | undefined }[]>([]);

  const updateTimeInMinutes = useCallback(() => {
    const convertedResult = timeAndCrowdedness.map(({ time, crowdedness }) => {
      const timeInMinutes = Math.round(
        (Date.parse(time) - Date.now()) / 1000 / 60
      );
      const normalizedTimeInMinutes = Math.max(0, timeInMinutes);
      return {
        time: normalizedTimeInMinutes,
        crowdedness,
      };
    });
    setTimeInMinutesAndCrowdedness(convertedResult);
  }, [timeAndCrowdedness]);

  useEffect(() => {
    updateTimeInMinutes();

    const intervalId = setInterval(() => {
      updateTimeInMinutes();
    }, SCREEN_CYCLE_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [updateTimeInMinutes]);

  return (
    <div className="bg-white border border-[#D3D3D3] flex flex-row items-stretch">
      {/* Accent line */}
      <div className={clsx(`w-[8px] shrink-0 ${routeStyles[routeType]}`)}></div>
      {/* Content */}
      <div className="flex flex-col grow items-stretch overflow-hidden gap-[4px]">
        {/* Top */}
        <div className="flex flex-row items-center justify-between pt-[11px] pl-[12px] overflow-hidden">
          <RouteBadge routeType={routeType} routeNumber={routeNumber} />
          <ArrivalTimes data={timeInMinutesAndCrowdedness} />
        </div>
        {/* Bottom */}
        <div className="flex flex-row items-center pl-[14px] gap-[13px] overflow-hidden">
          <div className="text-[42px]">➞</div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[72px] leading-tight tracking-[-0.1%]">
            {direction}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prediction;
