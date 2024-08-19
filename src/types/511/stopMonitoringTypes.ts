export interface ServiceDelivery {
  ResponseTimestamp: string;
  ProducerRef: string;
  Status: boolean;
  StopMonitoringDelivery: StopMonitoringDelivery;
}

export interface StopMonitoringDelivery {
  version: string;
  ResponseTimestamp: string;
  Status: boolean;
  MonitoredStopVisit: MonitoredStopVisit[];
}

export interface MonitoredStopVisit {
  RecordedAtTime: string;
  MonitoringRef: string;
  MonitoredVehicleJourney: MonitoredVehicleJourney;
}

export interface MonitoredVehicleJourney {
  LineRef: string;
  DirectionRef: string;
  FramedVehicleJourneyRef: FramedVehicleJourneyRef;
  PublishedLineName: string;
  OperatorRef: string;
  OriginRef: string;
  OriginName: string;
  DestinationRef: string;
  DestinationName: string;
  Monitored: boolean;
  InCongestion: null | boolean;
  VehicleLocation: VehicleLocation;
  Bearing: string | null;
  Occupancy: Occupancy;
  VehicleRef: string | null;
  MonitoredCall: MonitoredCall;
}

export interface FramedVehicleJourneyRef {
  DataFrameRef: string;
  DatedVehicleJourneyRef: string;
}

export interface VehicleLocation {
  Longitude: string;
  Latitude: string;
}

export type Occupancy = null | "full" | "seatsAvailable" | "standingAvailable";

export interface MonitoredCall {
  StopPointRef: string;
  StopPointName: string;
  VehicleLocationAtStop: string;
  VehicleAtStop: string | null;
  DestinationDisplay: string;
  AimedArrivalTime: string;
  ExpectedArrivalTime: string | null;
  AimedDepartureTime: string;
  ExpectedDepartureTime: string | null;
  Distances: string;
}
