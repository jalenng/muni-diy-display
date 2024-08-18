import clsx from "clsx";
import ArrivalTimes from "../components/ArrivalTimes";
import RouteBadge from "../components/RouteBadge";
import { TimeAndCrowdednessData } from "../types";
import { RouteType } from "../types/api";

interface PredictionProps {
  routeType: RouteType;
  routeNumber: number | string;
  direction: string;
  timeAndCrowdedness: TimeAndCrowdednessData[];
}

function Prediction(props: PredictionProps) {
  const { routeType, routeNumber, direction, timeAndCrowdedness } = props;

  return (
    <div className="bg-white border border-[#D3D3D3] flex flex-row items-stretch">
      {/* Accent line */}
      <div
        className={clsx("w-[8px]  shrink-0", {
          "bg-[#005B94]": routeType === "local",
          "bg-[#C3074D]": routeType === "rapid",
          "bg-[#4D5356]": routeType === "owl",
        })}
      ></div>
      {/* Content */}
      <div className="flex flex-col grow items-stretch overflow-hidden gap-[4px]">
        {/* Top */}
        <div className="flex flex-row items-center justify-between pt-[11px] pl-[12px] overflow-hidden">
          <RouteBadge routeType={routeType} routeNumber={routeNumber} />
          <ArrivalTimes data={timeAndCrowdedness} />
        </div>
        {/* Bottom */}
        <div className="flex flex-row items-center pl-[14px] gap-[13px] overflow-hidden">
          <div className="text-[42px]">➞</div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[72px] tracking-[-0.1%]">
            {direction}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prediction;
