import clsx from "clsx";
import { ReactNode } from "react";

function StepSection({
  number,
  header,
  children,
  isDisabled,
}: {
  number: ReactNode;
  header: ReactNode;
  children: ReactNode;
  isDisabled?: boolean;
}) {
  return (
    <div
      className={clsx("my-2.5 transition-opacity", {
        "opacity-20": isDisabled,
      })}
    >
      <fieldset disabled={isDisabled}>
        <h3 className="font-bold text-[22px] py-1">
          <span className="inline-flex items-center justify-center bg-[#BF2B45] rounded-full text-white min-w-9 min-h-9 mr-3">
            {number}
          </span>
          {header}
        </h3>
        {children}
      </fieldset>
    </div>
  );
}

export default StepSection;
