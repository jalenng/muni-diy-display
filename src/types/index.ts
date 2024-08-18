export type RouteType = "rapid" | "owl" | "local";

export interface PredictionData {
  routeType: RouteType;
  routeNumber: string | number;
  direction: string;
  timeAndCrowdedness: TimeAndCrowdednessData[];
}

export interface TimeAndCrowdednessData {
  time: number;
  crowdedness?: number;
}

export interface AlertData {
  stopId: string;
  message: string;
}
