import {KwicsFilterInvocation} from "../kwics-filter/kwics-filter-invocation";
import {KwicsEvent} from "../../invocation/event/kwics-event";
import {EventType} from "../../invocation/event/event-type";
import {KeywordPair} from "../../structures/keyword-pair";
import {RemoveKeywordEvent} from "../../invocation/event/remove-keyword-event";
import {DevPrinter} from "../../dev/dev-printer";
import {KeywordsStorage} from "../../structures/keywords-storage";
import {ListenableStorage} from "../../structures/listenable-storage";

export class InputInvocation {
  private _devPrinter: DevPrinter;
  private _inputLines: KeywordsStorage;
  private _outputLines: ListenableStorage;

  constructor() {
    this._devPrinter = new DevPrinter("Input");
    this._devPrinter.setPrint(false);

    this._inputLines = new KeywordsStorage();
    this._outputLines = new ListenableStorage();
  }

  setInputLines(inputLines: KeywordsStorage){
    this._devPrinter.setFunctionName("setInputLines");
    this._devPrinter.printMessage("setting input lines");

    this._inputLines = inputLines;
    this._inputLines.register(this);
  }

  setOutputLines(outputLines: ListenableStorage){
    this._devPrinter.setFunctionName("setOutputLines");
    this._devPrinter.printMessage("setting output lines");

    this._outputLines = outputLines;
  }

  process(event: KwicsEvent): any {
    this._devPrinter?.setFunctionName("process");

    if(event.eventType === EventType.READ_READY){
      this._addPair();
    }
    if(event.eventType === EventType.KEYWORD_REMOVED_EVENT){
      this._removePair(event as RemoveKeywordEvent);
    }
  }

  private _addPair(){
    this._devPrinter.setFunctionName("addPair");

    this._outputLines.setFinishedFlag(false);
    let pair = this._inputLines.read();

    this._devPrinter.printKeywordPair(pair);

    this._outputLines!.insert(pair);
    this._outputLines.setFinishedFlag(true);

  }

  private _removePair(event: RemoveKeywordEvent){
    this._devPrinter.setFunctionName("removePair");
    this._devPrinter.printMessage("removing " + event.getKeywordPair());

    this._outputLines.setFinishedFlag(false);

    this._outputLines!.remove(event.getKeywordPair());

    this._outputLines.setFinishedFlag(true);
  }

  notify(event: KwicsEvent): any {
    this._devPrinter.setFunctionName("notify");
    this._devPrinter.printMessage("getting notification");

    this.process(event);
  }
}

