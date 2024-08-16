import { useEffect, useMemo, useState } from "react";
import Predictions from "../screens/Predictions";
import { useSearchParams } from "react-router-dom";
import Alert from "../screens/Alert";
import { useAlerts } from "../hooks/useAlerts";

function Sign() {
  const [searchParams] = useSearchParams();

  const apiKey = searchParams.get("apiKey") ?? "";
  const stopIds = searchParams.get("stopIds")?.split(",") ?? [];

  const [screenDataIdx, setScreenDataIdx] = useState(0);

  const { data: alertsData } = useAlerts({ apiKey, stopIds });

  const screenData = useMemo(
    () => [
      ...alertsData.map((alertData) => ({
        screenType: "alert",
        data: alertData,
      })),
    ],
    [alertsData]
  );

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
      {currentScreenData?.screenType === "prediction" && (
        <Predictions
          stopId={stopIds[0]}
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
      {currentScreenData?.screenType === "alert" && (
        <Alert message={currentScreenData.data.message} />
      )}
    </div>
  );
}

export default Sign;
