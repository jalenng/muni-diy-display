import useSWR from "swr";
import { fetchServiceAlerts } from "../api/511";
import { useMemo } from "react";
import { AlertData } from "../types";

interface UseAlertsParams {
  apiKey: string;
  stopIds: string[];
  refreshInterval?: number;
}

export function useAlerts({
  apiKey,
  stopIds,
  refreshInterval = 300000, // 5 mins
}: UseAlertsParams) {
  const {
    data,
    error,
    isLoading,
  }: { data: unknown; error: unknown; isLoading: boolean } = useSWR(
    "511/fetchServiceAlerts",
    () => fetchServiceAlerts({ apiKey: apiKey }),
    { refreshInterval }
  );

  const parsedAlerts = useMemo<AlertData[]>(() => {
    const checkIfInActivePeriods = (activePeriods) => {
      const currentEpochTime = Date.now() / 1000;
      return activePeriods.some((period) => {
        return (
          period?.Start < currentEpochTime && period?.End > currentEpochTime
        );
      });
    };

    const checkIfIsInformedEntity = (informedEntities, stopIds) => {
      return informedEntities.some(
        (informedEntity) =>
          informedEntity?.AgencyId === "SF" &&
          (stopIds.length === 0 || stopIds.includes(informedEntity?.StopId))
      );
    };

    const activeAlerts =
      data?.Entities?.filter((entity) => {
        const { ActivePeriods, InformedEntities } = entity?.Alert ?? [];
        return (
          checkIfInActivePeriods(ActivePeriods) &&
          checkIfIsInformedEntity(InformedEntities, stopIds)
        );
      }) ?? [];

    return activeAlerts.map((entity) => {
      const stopId = entity?.Alert?.InformedEntities?.stopId;
      const message = entity?.Alert?.HeaderText?.Translations?.find(
        (translation) => translation?.Language === "en"
      )?.Text;
      return {
        stopId,
        message,
      };
    });
  }, [data, stopIds]);

  return { data: parsedAlerts, error, isLoading };
}
