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
    this._devPrinter.setPrint(true);
  }

  addKeywordPair(keywordPair: KeywordPair){
    this._devPrinter.setFunctionName("addKeywordPair");

    this.insert(keywordPair);
  }

  removeKeywordPair(keywordPair: KeywordPair): any {
    this._devPrinter.setFunctionName("removeKeywordPair");
    this._devPrinter.printPairList(this.getPairs())
    this._devPrinter.printMessage("removing ")
    this._devPrinter.printKeywordPair(keywordPair);
    this._devPrinter.printPairList(this.getPairs())
    this._devPrinter.printMessage("before length: " + this.length)

    this.remove(keywordPair);
    this._devPrinter.printMessage("after length: " + this.length)
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

    return this._pairs;
  }

  search(searchKeywords: string): ImprovedArray{
    this._devPrinter.setFunctionName("search");

    let temp: ImprovedArray = new ImprovedArray();

    for(let i = 0; i < this._pairs.length; ++i){
      if(this._pairs.getElementByIndex(i).containsKeywords(searchKeywords)){
        temp.push(this._pairs.getElementByIndex(i));
      }
    }

    return temp;
  }
}
