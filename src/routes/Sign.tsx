import { useEffect, useMemo, useState } from "react";
import Predictions from "../screens/Predictions";
import { useSearchParams } from "react-router-dom";
import Alert from "../screens/Alert";

function Sign() {
  let [searchParams, _] = useSearchParams();

  const stopIds = searchParams.get("stops");
  const alertRoutes = searchParams.get("alerts");

  const [screenDataIdx, setScreenDataIdx] = useState(0);
  const screenData = ["prediction", "alert"];

  const currentScreenData = useMemo(
    () => screenData[screenDataIdx],
    [screenData, screenDataIdx]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setScreenDataIdx((prev) => (prev + 1) % screenData.length);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div className="w-screen h-screen">
      {currentScreenData === "prediction" && (
        <Predictions
          stopId={stopIds}
          data={[
            {
              isRapid: true,
              routeNumber: "123",
              direction: "123",
              timeAndCrowdedness: [],
            },
          ]}
        />
      )}
      {currentScreenData === "alert" && <Alert message="lalalalalal" />}
    </div>
  );
}

export default Sign;
