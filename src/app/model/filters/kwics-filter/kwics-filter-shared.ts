import {Indices} from "../../structures/indices";
import {Characters} from "../../structures/characters";
import {ListenerInterface} from "../../invocation/listen/listener-interface";
import {KwicsEvent} from "../../invocation/event/kwics-event";

export class KwicsFilterShared implements ListenerInterface{
  inputLines: Indices;
  outputLines: Indices;
  charactersArray: Characters;
  listeners: ListenerInterface[];

  constructor(inputLines: Indices, outputLines: Indices, characters: Characters){
    this.inputLines = inputLines;
    this.outputLines = outputLines;
    this.charactersArray = characters;

    this.listeners = new Array<ListenerInterface>();
  }

  setInputLines(inputLines: any){
    this.inputLines = inputLines;
  }

  setOutputLines(outputLines: any){
    this.outputLines = outputLines;
  }

  setCharactersArray(charactersArray: any){
    this.charactersArray = charactersArray;
  }

  process(){
    throw new Error("this is an abstract method. Check your calls")
  }

  notify(event: KwicsEvent) {}

  updateListeners(event: KwicsEvent) {
    this.listeners.forEach(listener => {
      listener.notify(event);
    })
  }

  register(listener: ListenerInterface): any {
    this.listeners.push(listener);
  }
}
