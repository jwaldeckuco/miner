import {KwicsEvent} from "../event/kwics-event";
import {ListenerInterface} from "./listener-interface";
import {ImprovedArray} from "../../structures/improved-array";

export interface ListenableInterface {
  listeners: ImprovedArray;
  register(listener: ListenerInterface): any;
  unregister(listener: ListenerInterface): any;
  updateListeners(event: KwicsEvent): any;
}
