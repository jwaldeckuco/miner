import {KwicsFilterShared} from "../kwics-filter/kwics-filter-shared";
import {Indices} from "../../structures/indices";
import {Characters} from "../../structures/characters";

export class InputShared {
  private first = 0;
  private offset = 0;
  private dev = false;

  inputLines: string[];
  outputLines: Indices;
  charactersArray: Characters;

  constructor(input: string[], output: Indices, characters: Characters) {
    this.inputLines = input;
    this.outputLines = output;
    this.charactersArray = characters;
  }

  setInputLines(lines: string[]){
    this.inputLines = lines;
  }

  process(){
    this.inputLines.forEach((line: any) => {
      line = line.trim();

      this.setIndices(line);
      this.first += line.length + 1;
    });

    this.reset();
    this.pack();
  }

  private setIndices(line: string){
    this.offset = 0;

    for(let i = 0; i < line.length; ++i){
      if(i == 0 && line.charAt(0) !== " "){
        this.outputLines.setIndex(this.first,this.offset);
      }
      if(line.charAt(i) === " "){
        this.offset = i + 1;
        this.outputLines.setIndex(this.first, this.offset);
      }
    }
  }

  private pack(){
    this.charactersArray.setCharacters(this.inputLines.join(' '));
  }

  reset(){
    this.first = 0;
    this.offset = 0;
  }
}
