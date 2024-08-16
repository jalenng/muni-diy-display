import useSWR from "swr";
import { fetchPatterns, fetchStopMonitoringData } from "../api/511";
import { useMemo } from "react";
interface UsePredictionsParams {
  apiKey: string;
  stopIds: string[];
  stopMonitoringRefreshInterval?: number;
  patternsRefreshInterval?: number;
}

export function usePredictions({
  apiKey,
  stopIds,
  stopMonitoringRefreshInterval = 60000, // 1 min
  patternsRefreshInterval = 86400000, // 1 day
}: UsePredictionsParams) {
  const {
    data: stopMonitoringData,
    error: stopMonitoringError,
    isLoading: stopMonitoringIsLoading,
  }: { data: unknown; error: unknown; isLoading: boolean } = useSWR(
    ["511/fetchStopMonitoringData", stopIds],
    ([_, stopIds]) =>
      Promise.all(
        stopIds.map((stopId) =>
          fetchStopMonitoringData({ apiKey, stopCode: stopId })
        )
      ),
    { refreshInterval: stopMonitoringRefreshInterval }
  );

  const lineIds = useMemo(() => {
    return ["8"];
  }, [stopMonitoringData]);

  const {
    data: fetchPatternsData,
    error: fetchPatternsError,
    isLoading: fetchPatternsIsLoading,
  }: { data: unknown; error: unknown; isLoading: boolean } = useSWR(
    ["511/fetchPatterns", lineIds],
    ([_, lineIds]) =>
      Promise.all(lineIds.map((lineId) => fetchPatterns({ apiKey, lineId }))),
    { refreshInterval: patternsRefreshInterval }
  );

  const simplifiedPredictionData = useMemo(() => {
    const stopVisits =
      stopMonitoringData?.[0]?.ServiceDelivery?.StopMonitoringDelivery
        ?.MonitoredStopVisit ?? [];

    const calculateCrowdedness = (occupancy) => {
      if (!occupancy || occupancy === "null") return 0;
      return occupancy === "seatsAvailable" ? 1 : 2;
    };

    const calculateArrivalTime = (arrivalTime) =>
      Math.round((Date.parse(arrivalTime) - Date.now()) / 1000 / 60);

    const processVisit = (visit) => {
      const {
        MonitoredVehicleJourney: {
          LineRef: lineRef,
          DestinationRef: destinationRef,
          DestinationName: destinationName,
          MonitoredCall: { ExpectedArrivalTime: arrivalTime } = {},
          Occupancy: occupancy,
        } = {},
      } = visit;

      return {
        key: `${lineRef},${destinationRef}`,
        routeNumber: lineRef,
        direction: destinationName,
        timeAndCrowdedness: {
          time: calculateArrivalTime(arrivalTime),
          crowdedness: calculateCrowdedness(occupancy),
        },
      };
    };

    const lineToPredictionsMap = stopVisits.reduce((map, visit) => {
      const { key, routeNumber, direction, timeAndCrowdedness } =
        processVisit(visit);

      if (!map.has(key)) {
        map.set(key, {
          isRapid: false,
          routeNumber,
          direction,
          timeAndCrowdedness: [timeAndCrowdedness],
        });
      } else {
        map.get(key).timeAndCrowdedness.push(timeAndCrowdedness);
      }

      return map;
    }, new Map());

    return [...lineToPredictionsMap.values()];
  }, [stopMonitoringData]);

  return {
    data: simplifiedPredictionData,
    error: { stopMonitoringError, fetchPatternsError },
    isLoading: {
      stopMonitoringIsLoading,
      fetchPatternsIsLoading,
    },
  };
}
