export interface Direction {
  DirectionId: string;
  Name: string;
}

export interface DestinationDisplayView {
  FontText: string;
}

export interface StopPointInJourneyPattern {
  StopPointInJourneyPatternId: string;
  Order: string;
  ScheduledStopPointRef: string;
  Name: string;
  DestinationDisplayView: string;
}

export interface TimingPointInJourneyPattern {
  TimingPointInJourneyPatternId: string;
  Order: string;
  ScheduledStopPointRef: string;
  Name: string;
  DestinationDisplayView: string;
}

export interface PointsInSequence {
  StopPointInJourneyPattern: StopPointInJourneyPattern[];
  TimingPointInJourneyPattern: TimingPointInJourneyPattern[];
}

export interface LinksInSequence {
  ServiceLinkInJourneyPattern: string;
}

export interface JourneyPattern {
  serviceJourneyPatternRef: string;
  LineRef: string;
  TripCount: number;
  FromDate: string;
  ToDate: string;
  Name: string;
  DirectionRef: string;
  DestinationDisplayView: DestinationDisplayView;
  PointsInSequence: PointsInSequence;
  LinksInSequence: LinksInSequence;
}
