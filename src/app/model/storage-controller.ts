import {KeywordsStorage} from "./structures/keywords-storage";
import {ResultCardComponent} from "../controller/result-card/result-card.component";
import {KwicsListenable} from "./structures/kwics-listenable";
import {ListenerInterface} from "./invocation/listen/listener-interface";

export class StorageController {
  private _keywordStorage: KeywordsStorage;
  private _resultStorage: KeywordsStorage;

  constructor() {
    this._keywordStorage = new KeywordsStorage();
    this._resultStorage = new KeywordsStorage();
  }

  registerKeywordListener(listener: ListenerInterface){
    this._keywordStorage.register(listener);
  }

  registerResultsListener(listener: ListenerInterface){
    this._resultStorage.register(listener);
  }

  isResultsEmpty(): boolean {
    return this._resultStorage.isEmpty();
  }

  get keywordStorage(): KeywordsStorage{
    return this._keywordStorage;
  }

  get resultStorage(): KeywordsStorage {
    return this._resultStorage;
  }
  //
  // static getInstance(): StorageController{
  //   return this;
  // }

}
