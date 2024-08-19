import useSWR from "swr";
import { fetchServiceAlerts } from "../api/511";
import { useMemo } from "react";
import { AlertData } from "../types";
import { ActivePeriod, InformedEntity } from "../types/511/serviceAlertsTypes";

interface UseAlertsParams {
  apiKey: string;
  stopId: string;
  refreshInterval?: number;
}

export function useAlerts({
  apiKey,
  stopId,
  refreshInterval = 300000, // 5 mins
}: UseAlertsParams) {
  const { data, error, isLoading } = useSWR(
    "511/fetchServiceAlerts",
    () => fetchServiceAlerts({ apiKey: apiKey }),
    { refreshInterval }
  );

  const parsedAlerts = useMemo<AlertData[]>(() => {
    const checkIfInActivePeriods = (activePeriods: ActivePeriod[]) => {
      const currentEpochTime = Date.now() / 1000;
      return activePeriods.some((period) => {
        return period.Start < currentEpochTime && period.End > currentEpochTime;
      });
    };

    const checkIfIsInformedEntity = (
      informedEntities: InformedEntity[],
      stopId: string
    ) => {
      return informedEntities.some(
        (informedEntity) =>
          informedEntity.AgencyId === "SF" && informedEntity.StopId === stopId
      );
    };

    const activeAlerts =
      data?.Entities.filter((entity) => {
        const { ActivePeriods, InformedEntities } = entity.Alert ?? [];
        return (
          checkIfInActivePeriods(ActivePeriods) &&
          checkIfIsInformedEntity(InformedEntities, stopId)
        );
      }) ?? [];

    return activeAlerts.map((entity) => {
      const message =
        entity.Alert.HeaderText.Translations.find(
          (translation) => translation.Language === "en"
        )?.Text ?? "";
      return {
        stopId,
        message,
      };
    });
  }, [data, stopId]);

  return { data: parsedAlerts, error, isLoading };
}
