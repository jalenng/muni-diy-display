import useSWR from "swr";
import { fetchPatterns, fetchStopMonitoringData } from "../api/511";
import { useMemo } from "react";
import {
  MonitoredStopVisit,
  Occupancy,
} from "../types/511/stopMonitoringTypes";
import { FetchPatternsRes } from "../types/511";
interface UsePredictionsParams {
  apiKey: string;
  stopId: string;
  stopMonitoringRefreshInterval?: number;
  patternsRefreshInterval?: number;
}

export function usePredictions({
  apiKey,
  stopId,
  stopMonitoringRefreshInterval = 60000, // 1 min
  patternsRefreshInterval = 86400000, // 1 day
}: UsePredictionsParams) {
  const {
    data: stopMonitoringData,
    error: stopMonitoringError,
    isLoading: stopMonitoringIsLoading,
  } = useSWR(
    ["511/fetchStopMonitoringData", stopId],
    ([_, stopId]) => fetchStopMonitoringData({ apiKey, stopCode: stopId }),
    { refreshInterval: stopMonitoringRefreshInterval }
  );

  const lineIds = useMemo(() => {
    const lineIdsList =
      stopMonitoringData?.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit.map(
        (stopVisit) => stopVisit?.MonitoredVehicleJourney?.LineRef
      );
    return [...new Set(lineIdsList)];
  }, [stopMonitoringData]);

  const {
    data: patternsData,
    error: patternsError,
    isLoading: patternsIsLoading,
  } = useSWR(
    ["511/fetchPatterns", lineIds],
    async ([_, lineIds]) => {
      const results = await Promise.all(
        lineIds.map(async (lineId) => {
          const data = await fetchPatterns({ apiKey, lineId });
          return { lineId, data };
        })
      );
      return results.reduce((acc, { lineId, data }) => {
        acc[lineId] = data;
        return acc;
      }, {} as Record<string, FetchPatternsRes>);
    },
    { refreshInterval: patternsRefreshInterval }
  );

  const simplifiedPredictionData = useMemo(() => {
    const stopVisits =
      stopMonitoringData?.ServiceDelivery.StopMonitoringDelivery
        .MonitoredStopVisit ?? [];

    const calculateRouteType = (lineRef: string) => {
      if (["F"].includes(lineRef)) {
        return "f";
      }
      if (["J"].includes(lineRef)) {
        return "j";
      }
      if (["K", "KBUS"].includes(lineRef)) {
        return "k";
      }
      if (["L", "LBUS"].includes(lineRef)) {
        return "l";
      }
      if (["M", "MBUS"].includes(lineRef)) {
        return "m";
      }
      if (["N", "NBUS"].includes(lineRef)) {
        return "n";
      }
      if (["S"].includes(lineRef)) {
        return "s";
      }
      if (["T", "TBUS"].includes(lineRef)) {
        return "t";
      }
      if (["CA", "PM", "PH"].includes(lineRef)) {
        return "cc";
      }
      if (["90", "91", "NOWL", "LOWL"].includes(lineRef)) {
        return "owl";
      }
      if (lineRef.endsWith("R")) {
        return "rapid";
      }
      return "local";
    };

    const calculateCrowdedness = (occupancy: Occupancy | null | undefined) => {
      const occupancyToCrowdednessMap = {
        seatsAvailable: 1,
        standingAvailable: 2,
        full: 3,
      };
      if (occupancy === null || occupancy === undefined) {
        return 0;
      } else {
        return occupancyToCrowdednessMap[occupancy] ?? 0;
      }
    };

    const getBetterDestinationName = (
      lineRef: string,
      destinationRef: string
    ) => {
      const patternsDataForLine = patternsData?.[lineRef];
      if (patternsDataForLine !== undefined) {
        const foundPattern = patternsDataForLine.journeyPatterns.find(
          (pattern) => {
            const allPointsSorted = [
              ...pattern.PointsInSequence.StopPointInJourneyPattern,
              ...pattern.PointsInSequence.TimingPointInJourneyPattern,
            ].sort((a, b) => parseInt(a.Order) - parseInt(b.Order));
            const lastSortedPoint = allPointsSorted[allPointsSorted.length - 1];
            return lastSortedPoint.ScheduledStopPointRef === destinationRef;
          }
        );
        if (foundPattern) {
          return foundPattern.DestinationDisplayView.FontText;
        }
      }
    };

    const processVisit = (visit: MonitoredStopVisit) => {
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
        routeType: calculateRouteType(lineRef),
        routeNumber: lineRef,
        direction:
          getBetterDestinationName(lineRef, destinationRef) ?? destinationName,
        timeAndCrowdedness: {
          time: arrivalTime,
          crowdedness: calculateCrowdedness(occupancy),
        },
      };
    };

    const lineToPredictionsMap = stopVisits.reduce((map, visit) => {
      const { key, routeType, routeNumber, direction, timeAndCrowdedness } =
        processVisit(visit);

      if (timeAndCrowdedness.time === null) {
        return map;
      }

      if (!map.has(key)) {
        map.set(key, {
          routeType,
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
  }, [patternsData, stopMonitoringData]);

  return {
    data: simplifiedPredictionData,
    error: { stopMonitoringError, patternsError },
    isLoading: {
      stopMonitoringIsLoading,
      patternsIsLoading,
    },
  };
}
