export interface Header {
  GtfsRealtimeVersion: string;
  incrementality: number;
  Timestamp: number;
}

export interface ActivePeriod {
  Start: number;
  End: number;
}

export interface InformedEntity {
  AgencyId: string;
  RouteId: string;
  Trip: null | Trip;
  StopId: string;
}

export interface Translation {
  Text: string;
  Language: string;
}

export interface AlertText {
  Translations: Translation[];
}

export interface Alert {
  ActivePeriods: ActivePeriod[];
  InformedEntities: InformedEntity[];
  Url: null | string;
  HeaderText: AlertText;
  DescriptionText: AlertText;
  TtsHeaderText: null | string;
  TtsDescriptionText: null | string;
}

export interface Entity {
  Id: string;
  TripUpdate: null | TripUpdate;
  Vehicle: null | Vehicle;
  Alert: Alert;
}

export type TripUpdate = unknown;
export type Vehicle = unknown;
export type Trip = unknown;
