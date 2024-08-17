import { useEffect, useMemo, useState } from "react";
import Predictions from "../screens/Predictions";
import { useSearchParams } from "react-router-dom";
import Alert from "../screens/Alert";
import { useAlerts } from "../hooks/useAlerts";
import { usePredictions } from "../hooks/usePredictions";
import Loading from "../components/Loading";

const SCREEN_CYCLE_INTERVAL = 5000;

function Sign() {
  const [searchParams] = useSearchParams();

  const apiKey = searchParams.get("apiKey") ?? "";
  const stopIds = searchParams.get("stopIds")?.split(",") ?? [];

  const [screenDataIdx, setScreenDataIdx] = useState(0);

  const { data: alertsData } = useAlerts({ apiKey, stopIds });
  const { data: predictionData } = usePredictions({ apiKey, stopIds });

  const screenData = useMemo(
    () => [
      ...(predictionData.length > 0
        ? [{ screenType: "prediction", data: predictionData }]
        : []),
      ...alertsData.map((data) => ({
        screenType: "alert",
        data,
      })),
    ],
    [predictionData, alertsData]
  );

  const currentScreenData = useMemo(
    () => screenData[screenDataIdx],
    [screenData, screenDataIdx]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setScreenDataIdx((prev) => (prev + 1) % screenData.length);
    }, SCREEN_CYCLE_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div className="w-screen h-screen">
      {currentScreenData === undefined && <Loading />}

      {currentScreenData?.screenType === "prediction" && (
        <Predictions stopId={stopIds[0]} data={currentScreenData.data} />
      )}
      {currentScreenData?.screenType === "alert" && (
        <Alert message={currentScreenData.data.message} />
      )}
    </div>
  );
}

export default Sign;
