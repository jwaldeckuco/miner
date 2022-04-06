import {KWICSFilter} from "./kwics-filter";
import {Line} from "../model/line";
import {Indices} from "../model/indices";
import {Characters} from "../model/characters";

export class Alphabetizer extends KWICSFilter{
  private charVals: number[][] = [];
  private sortOrder: number[] = [];

  constructor(input: Indices, output:Indices, characters: Characters) {
    super(input, output, characters);
  }

  /** Takes the shifted lines from the last filter and alphabetizes them. */
  override process(){
    // only alphabetize if there is more than one inputLine
    if(this.inputLines.getLines().length > 1){
      this.alphabetize();
    }
    else{
      console.log("pushing to output lines")
      this.outputLines = this.inputLines;
    }

    console.log("sort order");
    console.log(this.sortOrder)
    this.correlate();

    this.reset();
  }

  /** alphabetizes the shifted inputLines in ascending order.
   * Lowercase characters are sorted before uppercase characters (eg: a < A)
   */
  private alphabetize(){
    this.inputLines.getLines().forEach((line: Line) => {
      this.pushCharValueArray(line);
    });

    console.log("char vals");
    console.log(this.charVals);

    this.sortOrder = [];

    for(let i = 0; i < this.charVals.length; ++i){
      let largerThan = 0;

      for(let j = 0; j < this.charVals.length; ++j){
        if(i !== j){
          if(this.compareLineValues(i, j) === i){
            largerThan++;
          }
        }
      }

      this.sortOrder.push(largerThan);
    }
  }

  private correlate(){
    let indices = [];
    for(let i = 0; i < this.sortOrder.length; ++i){
      indices.push(-1);
    }

    for(let i = 0; i < this.sortOrder.length; ++i){
      indices[this.sortOrder[i]] = i;
    }

    for(let i = 0; i < indices.length; ++i){
      this.outputLines.addLine(this.inputLines.getLines()[indices[i]]);
    }
  }

  private pushCharValueArray(line: Line){
    let words = [];
    let tempValues: number[] = [];

    for(let i = 0; i < line.getOffsets().length; ++i){
      words.push(this.charactersArray.getWordByIndex(line.getFirst() + line.getOffsets()[i]));
    }

    for(let j = 0; j < words.length; ++j){
      let word = words[j];

      for(let i = 0; i < word.length; ++i){
        let value = this.adjustCharCode(word.charCodeAt(i));
        tempValues.push(value);
      }

      if(j < words.length -1){
        tempValues.push(0);
      }
    }

    this.charVals.push(tempValues);
  }

  private compareLineValues(aIndex: number, bIndex: number){
    let a = this.charVals[aIndex];
    let b = this.charVals[bIndex];

    let index = (a.length < b.length) ? a.length : b.length;

    for(let i = 0; i < index; ++i){
      let result = this.compareCharValues(a[i], b[i]);

      if(result > 0){
        return aIndex;
      }
      else if(result < 0){
        return bIndex;
      }
    }

    return 0;
  }

  private compareCharValues(aValue: number, bValue: number){
    return aValue - bValue;
  }

  private adjustCharCode(a: number){
    if(a >= 97){
      return (a -97) * 2;
    }
    else{
      return ((a - 65) * 2) + 1;
    }
  }

  reset(){
    this.charVals = [];
    this.sortOrder = [];
  }
}
