import clsx from "clsx";

interface RouteBadgeProps {
  isRapid: boolean;
  routeNumber: string | number;
}

function RouteBadge(props: RouteBadgeProps) {
  const { isRapid, routeNumber } = props;

  return (
    <div
      className={clsx("flex px-[67px] py-[9px] rounded-[54px]", {
        "bg-[#C3074D]": isRapid,
        "bg-[#005B94]": !isRapid,
      })}
    >
      <span className={"text-[100px] leading-none text-white"}>
        {routeNumber}
      </span>
    </div>
  );
}

export default RouteBadge;
