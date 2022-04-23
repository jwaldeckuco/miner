import {KwicsEvent} from "../../invocation/event/kwics-event";
import {DevPrinter} from "../../dev/dev-printer";
import {KeywordsStorage} from "../../structures/keywords-storage";
import {ListenableStorage} from "../../structures/listenable-storage";
import {EventType} from "../../invocation/event/event-type";

export class OutputInvocation {
  private _devPrinter: DevPrinter;
  private inputLines: ListenableStorage;
  private outputLines: KeywordsStorage;

  constructor() {
    this._devPrinter = new DevPrinter("Output");
    this._devPrinter.setPrint(false);

    this.inputLines = new ListenableStorage();
    this.outputLines = new KeywordsStorage();
  }

  setInputLines(inputLines: ListenableStorage){
    this._devPrinter.setFunctionName("setInputLines");

    this.inputLines = inputLines;
    this.inputLines.register(this);
  }

  setOutputLines(outputLines: KeywordsStorage){
    this._devPrinter.setFunctionName("setOutputLines");

    this.outputLines = outputLines;
  }

  process(event: KwicsEvent): any {
    this._devPrinter.setFunctionName("process");
    this._devPrinter.printMessage("processing");



    if(event.eventType === EventType.READ_READY){
      this.outputLines!.setFinishedFlag(false);

      for(let i = 0; i < this.inputLines!.length; ++i){
        this._devPrinter.printMessage("inserting into outlines")
        this.outputLines!.addKeywordPair(this.inputLines.getAtIndex(i));
      }

      this.inputLines.clear();
      this.outputLines!.setFinishedFlag(true);
    }
  }

  notify(event: KwicsEvent): any {
    this._devPrinter.setFunctionName("notify");
    this._devPrinter.printMessage("receiving notification");

    this.process(event);
  }
}
