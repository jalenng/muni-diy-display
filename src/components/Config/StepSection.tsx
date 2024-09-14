import { ReactNode } from "react";

function StepSection({
  number,
  header,
  children,
}: {
  number: ReactNode;
  header: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="my-2.5">
      <h3 className="font-bold text-[22px] py-1">
        <span className="inline-flex items-center justify-center bg-[#BF2B45] rounded-full text-white min-w-9 min-h-9 mr-3">
          {number}
        </span>
        {header}
      </h3>
      {children}
    </div>
  );
}

export default StepSection;
