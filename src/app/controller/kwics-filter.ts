import {Indices} from "../model/indices";
import {Characters} from "../model/characters";

export class KWICSFilter {
  inputLines: Indices;
  outputLines: Indices;
  charactersArray: Characters;

  constructor(inputLines: Indices, outputLines: Indices, characters: Characters){
    this.inputLines = inputLines;
    this.outputLines = outputLines;
    this.charactersArray = characters;
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
}
