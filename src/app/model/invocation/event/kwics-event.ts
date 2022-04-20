import {EventType} from "./event-type";

export class KwicsEvent {
  eventType: EventType;

  constructor(eventType: EventType) {
    this.eventType = eventType;
  }
}
