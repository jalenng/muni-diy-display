import { Direction, JourneyPattern } from "./patterns";
import { Entity, Header } from "./serviceAlertsTypes";
import { ServiceDelivery } from "./stopMonitoringTypes";

export interface FetchStopMonitoringParams {
  apiKey: string;
  stopCode: string;
}
export interface FetchStopMonitoringRes {
  ServiceDelivery: ServiceDelivery;
}

export interface FetchServiceAlertsParams {
  apiKey: string;
}
export interface FetchServiceAlertsRes {
  Header: Header;
  Entities: Entity[];
}

export interface FetchPatternsParams {
  apiKey: string;
  lineId: string;
}
export interface FetchPatternsRes {
  directions: Direction[];
  journeyPatterns: JourneyPattern[];
}
