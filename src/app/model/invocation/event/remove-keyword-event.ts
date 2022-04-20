import {KwicsEvent} from "./kwics-event";
import {KeywordPair} from "../../structures/keyword-pair";
import {EventType} from "./event-type";

export class RemoveKeywordEvent extends KwicsEvent{
  keywordPair: KeywordPair;

  constructor(keywordPair: KeywordPair) {
    super(EventType.KEYWORD_REMOVED_EVENT);
    this.keywordPair = keywordPair;
  }

  getKeywordPair(): KeywordPair {
    return this.keywordPair;
  }

}
