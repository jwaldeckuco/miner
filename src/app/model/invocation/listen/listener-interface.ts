
import {KwicsEvent} from "../event/kwics-event";

export interface ListenerInterface {
  notify(event: KwicsEvent): any;
}
