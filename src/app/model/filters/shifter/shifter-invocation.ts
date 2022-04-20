import {Line} from "../../structures/line";
import {KwicsFilterInvocation} from "../kwics-filter/kwics-filter-invocation";
import {KwicsEvent} from "../../invocation/event/kwics-event";
import {EventType} from "../../invocation/event/event-type";
import {KeywordPair} from "../../structures/keyword-pair";
import {NoiseFilter} from "../noise-filter";
import {first} from "rxjs";

export class ShifterInvocation extends KwicsFilterInvocation {
  private _filtering: boolean;

  constructor(){
    super("shifter");
    this._devPrinter?.setPrint(false);

    this._filtering = false;
  }

  setNoiseFiltering(filter: boolean){
    this._devPrinter?.setFunctionName("setNoiseFiltering");

    this._filtering = filter;
  }

  override process(event: KwicsEvent){
    this._devPrinter?.setFunctionName("process");
    this._devPrinter?.printMessage("processing");

    if(event.eventType === EventType.READ_READY){
      this.shiftLine(this.inputLines!.read());
    }
  }

  private shiftLines(){  }

  private shiftLine(keywordPair: KeywordPair){
    this._devPrinter?.setFunctionName("shiftLine");
    this._devPrinter?.printMessage("shifting Line");
    this._devPrinter?.printKeywordPair(keywordPair);

    this.outputLines!.setFinishedFlag(false);

    let url = keywordPair.getUrl();
    let tempWords = keywordPair.getKeyword().split(" ");

    if(tempWords.length > 1){
      let temp: string[] = [...tempWords];

      for(let i = 0; i < temp.length; ++i) {
        let firstWord = temp[0];

        // if first word is not a noise word
        if(!NoiseFilter.isNoise(firstWord!)){
          let wordString = this.createString(temp);

          let tempPair = new KeywordPair(wordString, url);
          this._devPrinter?.printKeywordPair(tempPair);

          this.outputLines!.insert(tempPair);
        }

        // shift
        temp.shift();
        temp.push(firstWord!);
      }
    }
    else{
      if(this._filtering && !NoiseFilter.isNoise(tempWords[0])){
        this._devPrinter!.printMessage("pushing keyword");
        this.outputLines!.insert(keywordPair);
      }
      else{
        this._devPrinter!.printMessage("pushing keyword");

        this.outputLines!.insert(keywordPair);
      }
    }

    this.outputLines?.setFinishedFlag(true);
  }

  private createString(words: string[]): string{
    return words.join(" ");
  }

  notify(event: KwicsEvent) {
    this._devPrinter!.setFunctionName("notify");
    this._devPrinter!.printMessage("getting notification");

    this.process(event);
  }
}
