import {KwicsListenable} from "./kwics-listenable";
import {ImprovedArray} from "./improved-array";
import {EventType} from "../invocation/event/event-type";
import {KwicsEvent} from "../invocation/event/kwics-event";
import {DevPrinter} from "../dev/dev-printer";
import {RemoveKeywordEvent} from "../invocation/event/remove-keyword-event";

export class ListenableStorage extends KwicsListenable{
  protected _pairs: ImprovedArray;
  private _finished: boolean;

  constructor() {
    super();
    this._pairs = new ImprovedArray();
    this._finished = false;

    this._devPrinter = new DevPrinter("ListenableStorage");
    this._devPrinter.setPrint(true);
  }

  insert(element: any){
    this._devPrinter.setFunctionName("insert");

    this._pairs.add(element);
  }

  remove(element: any){
    this._devPrinter.setFunctionName("remove");

    this._pairs.remove(element);
    this.updateListeners(new RemoveKeywordEvent(element));
  }

  read(): any {
    this._devPrinter.setFunctionName("read");

    return this._pairs.getLast();
  }

  getAtIndex(index: number){
    return this._pairs.getElementByIndex(index);
  }

  // returns the length of the pairs Improved Array
  get length(){
    return this._pairs.length;
  }

  isEmpty(): boolean {
    return this._pairs.isEmpty();
  }

  reset(){
    this._devPrinter.setFunctionName("reset");

    this._pairs.clear();
  }

  // sets the finished flag, notifying listeners if true
  setFinishedFlag(finished: boolean){
    this._devPrinter.setFunctionName("setFinishedFlag");

    this._finished = finished;

    if(finished){
      // this._devPrinter.printMessage("finished flag set");

      this.updateListeners(new KwicsEvent(EventType.READ_READY));
    }
  }

  // clears the keyword storage pairs
  clear(){
    this._pairs.clear();
  }
}
