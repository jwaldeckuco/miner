import {ListenableInterface} from "../invocation/listen/listenable-interface";
import {ListenerInterface} from "../invocation/listen/listener-interface";
import {KwicsEvent} from "../invocation/event/kwics-event";
import {ImprovedArray} from "./improved-array";
import {DevPrinter} from "../dev/dev-printer";

export class KwicsListenable implements ListenableInterface{
  listeners: ImprovedArray;
  protected _devPrinter: DevPrinter;

  constructor() {
    this.listeners = new ImprovedArray();
    this._devPrinter = new DevPrinter("KWICS Listenable");
  }

  register(listener: ListenerInterface): any {
    this._devPrinter.setFunctionName("register");
    this.listeners.add(listener);
  }

  updateListeners(event: KwicsEvent): any {
    this._devPrinter.setFunctionName("updateListeners");
    this._devPrinter.printEnd();

    this.listeners.forEach(listener => {
      listener.notify(event);
    });
  }

  unregister(listener: ListenerInterface): any {
    this._devPrinter.setFunctionName("unregister");

    this.listeners.remove(listener);
  }
}
