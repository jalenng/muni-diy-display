import clsx from "clsx";
import { RouteType } from "../../types";
import { routeStyles } from "./routeStyles";
import { useMemo } from "react";

interface RouteBadgeProps {
  routeType: RouteType;
  routeNumber: string | number;
}

function RouteBadge(props: RouteBadgeProps) {
  const { routeType, routeNumber } = props;

  const [numberPart, typePart] = useMemo(() => {
    const regex = /^(.*?)(R|BUS)$/;
    const match = routeNumber.toString().match(regex);

    return match ? [match[1], match[2]] : [routeNumber, null];
  }, [routeNumber]);

  return (
    <div
      className={clsx(
        `px-[67px] py-[9px] rounded-full font-light ${routeStyles[routeType]}`
      )}
    >
      <span className={"text-[100px] leading-none align-middle"}>
        {numberPart}
      </span>
      <span className={"text-[50px] leading-none align-middle"}>
        {typePart}
      </span>
    </div>
  );
}

export default RouteBadge;
