// export * from './api.ts';

export interface PredictionData {
  isRapid: boolean;
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
