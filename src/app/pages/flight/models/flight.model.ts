export interface FlightSearch {
  departureAirportCode: string;
  arrivalAirportCode: string;
  departureDate: Date;
  returnDate: Date;
}
export interface FlightList {
  AirlineLogoAddress: string;
  AirlineName: string;
  InboundFlightsDuration: string;
  ItineraryId?: string;
  OutboundFlightsDuration: string;
  Stops: number;
  TotalAmount: number;
}
