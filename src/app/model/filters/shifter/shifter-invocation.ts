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
    this._filtering = filter;
  }

  override process(event: KwicsEvent){
    this._devPrinter?.setFunctionName("process");
    this._devPrinter?.printMessage("processing");

    if(event.eventType === EventType.READ_READY){
      this.outputLines!.setFinishedFlag(false);

      for(let i = 0; i < this.inputLines!.length; ++i){
        this.shiftLine(this.inputLines!.getAtIndex(i));
        this._devPrinter?.printMessage("done shifting " + this.inputLines!.getAtIndex(i).getKeyword())
      }

      this._devPrinter!.printEnd();

      this.inputLines?.clear();
      this.outputLines!.setFinishedFlag(true);
    }
  }

  private shiftLine(keywordPair: KeywordPair){
    this._devPrinter?.setFunctionName("shiftLine");
    this._devPrinter?.printMessage("shifting Line");
    this._devPrinter?.printKeywordPair(keywordPair);

    let url = keywordPair.getUrl();
    let tempWords = keywordPair.getKeyword().split(" ");

    // if there is more than one word in the keyword string
    // shift
    if(tempWords.length > 1){
      let temp: string[] = [...tempWords];

      for(let i = 0; i < temp.length; ++i) {
        let firstWord = temp[0];

        // if first word is not a noise word
        if(!NoiseFilter.isNoise(firstWord!)){
          let wordString = this.createString(temp);

          let tempPair = new KeywordPair(wordString, url);
          this._devPrinter!.printMessage("pushing shifted keyword " + tempPair.getKeyword())

          this.outputLines!.insert(tempPair);
        }

        // shift
        temp.shift();
        temp.push(firstWord!);
      }
    }
    // only one keyword
    else{
      // if the keyword isn't a noise word, pass it to outputlines
      if(!NoiseFilter.isNoise(tempWords[0])){
        this._devPrinter!.printMessage("pushing shifted keyword");

        this.outputLines!.insert(keywordPair);
      }
    }
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
