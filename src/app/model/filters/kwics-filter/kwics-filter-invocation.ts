
import {KwicsEvent} from "../../invocation/event/kwics-event";
import {ListenableStorage} from "../../structures/listenable-storage";
import {ListenerInterface} from "../../invocation/listen/listener-interface";
import {KeywordsStorage} from "../../structures/keywords-storage";
import {DevPrinter} from "../../dev/dev-printer";

export abstract class KwicsFilterInvocation implements ListenerInterface{
  protected _devPrinter: DevPrinter | undefined;
  protected inputLines: ListenableStorage | undefined;
  protected outputLines: ListenableStorage | undefined;

  protected constructor(moduleName: string){
    this._devPrinter = new DevPrinter(moduleName);
  }

  setInputLines(inputLines: any){
    this._devPrinter?.setFunctionName("setInputLines");

    this.inputLines = inputLines;
    this.register();
  }

  setOutputLines(outputLines: any){
    this._devPrinter?.setFunctionName("setOutputLines");

    this.outputLines = outputLines;
  }

  private register(){
    this._devPrinter?.setFunctionName("register");

    this.inputLines!.register(this);
  }

  abstract process(event: KwicsEvent): any;
  abstract notify(event: KwicsEvent): any;
}
