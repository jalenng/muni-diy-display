import { useEffect, useMemo, useState } from "react";

const ELLIPSIS_CYCLE_INTERVAL = 1000;

function Loading() {
  const [ellipsisCount, setEllipsisCount] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setEllipsisCount((prev) => (prev % 3) + 1);
    }, ELLIPSIS_CYCLE_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  });

  const ellipsisString = useMemo(
    () => ".".repeat(ellipsisCount),
    [ellipsisCount]
  );

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="text-[64px] text-white">
        <span>Loading signage</span>
        <span>{ellipsisString}</span>
      </div>
    </div>
  );
}

export default Loading;
