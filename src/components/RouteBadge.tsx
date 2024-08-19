import clsx from "clsx";
import { RouteType } from "../types";

interface RouteBadgeProps {
  routeType: RouteType;
  routeNumber: string | number;
}

function RouteBadge(props: RouteBadgeProps) {
  const { routeType, routeNumber } = props;

  return (
    <div
      className={clsx("flex px-[67px] py-[9px] rounded-full", {
        "bg-[#005B94]": routeType === "local",
        "bg-[#C3074D]": routeType === "rapid",
        "bg-[#4D5356]": routeType === "owl",
      })}
    >
      <span className={"text-[100px] leading-none text-white"}>
        {routeNumber}
      </span>
    </div>
  );
}

export default RouteBadge;
