import {KwicsEvent} from "../invocation/event/kwics-event";
import {EventType} from "../invocation/event/event-type";
import {KwicsListenable} from "./kwics-listenable";
import {ImprovedArray} from "./improved-array";
import {KeywordPair} from "./keyword-pair";
import {DevPrinter} from "../dev/dev-printer";
import {ListenableStorage} from "./listenable-storage";

export class KeywordsStorage extends ListenableStorage{

  constructor() {
    super();
    this._devPrinter = new DevPrinter("KeywordsStorage");
    this._devPrinter.setPrint(false);
  }

  addKeywordPair(keywordPair: KeywordPair){
    this._devPrinter.setFunctionName("addKeywordPair");

    this.insert(keywordPair);

    this._devPrinter.printKeywordPair(keywordPair);
  }

  removeKeywordPair(keywordPair: KeywordPair): any {
    this._devPrinter.setFunctionName("removeKeywordPair");

    this.remove(keywordPair);
    this.updateListeners(new KwicsEvent(EventType.KEYWORD_REMOVED_EVENT));
  }

  getKeywords(): string[]{
    this._devPrinter.setFunctionName("getKeywordPairs");
    let temp: string[] = [];

    this._pairs.forEach(keywordPair => {
      temp.push(keywordPair.getKeyword());
    });
    return [...temp];
  }

  getPairs(): KeywordPair[]{
    this._devPrinter.setFunctionName("getPairs");
    return [...this._pairs];
  }
}
