import {KwicsListenable} from "./kwics-listenable";
import {ImprovedArray} from "./improved-array";
import {EventType} from "../invocation/event/event-type";
import {KwicsEvent} from "../invocation/event/kwics-event";
import {DevPrinter} from "../dev/dev-printer";

export class ListenableStorage extends KwicsListenable{
  protected _pairs: ImprovedArray;
  private _finished: boolean;

  constructor() {
    super();
    this._pairs = new ImprovedArray();
    this._finished = false;

    this._devPrinter = new DevPrinter("ListenableStorage");
    this._devPrinter.setPrint(false);

  }

  insert(element: any){
    this._devPrinter.setFunctionName("insert");
    this._pairs.add(element);
    // this.updateListeners(new KwicsEvent(EventType.ELEMENT_ADDED_EVENT));
  }

  remove(element: any){
    this._devPrinter.setFunctionName("remove");

    this._pairs.remove(element);
    this.updateListeners(new KwicsEvent(EventType.ELEMENT_REMOVED_EVENT));
  }

  read(): any {
    this._devPrinter.setFunctionName("read");

    return this._pairs.getLast();
  }

  getAtIndex(index: number){
    return this._pairs.getElementByIndex(index);
  }

  get length(){
    this._devPrinter.setFunctionName("get length");

    return this._pairs.length;
  }

  isEmpty(): boolean {
    this._devPrinter.setFunctionName("isEmpty");

    return this._pairs.isEmpty();
  }

  reset(){
    this._devPrinter.setFunctionName("reset");

    this._pairs.clear();
  }

  setFinishedFlag(finished: boolean){
    this._finished = finished;

    if(finished){
      this.updateListeners(new KwicsEvent(EventType.READ_READY));
    }
  }

  clear(){
    this._pairs.clear();
  }

}
