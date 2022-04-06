import {KWICSFilter} from "./kwics-filter";
import {Line} from "../model/line";
import { Characters } from "../model/characters";
import { Indices } from "../model/indices";

export class CircularShifter extends KWICSFilter {
  private noiseWords = [
    "a", "an", "the", "and", "or", "of", "to", "be", "is", "in", "out",
    "by", "as", "at", "off"
  ];

  constructor(input: Indices, output: Indices, characters: Characters){
    super(input, output, characters);
  }

  //Gets the unshifted keyword lines, performs the shifting process
  override process(){
    this.shiftLines();
  }

  // Coordinates the shifting of each keyword line
  private shiftLines(){
    this.inputLines.getLines().forEach((line: Line) => {
      this.shiftLine(line);
    });
  }

  //Performs the actual shifting of the supplied keyword line
  private shiftLine(line: Line){
    const tempOffsets = [...line.getOffsets()];
    // for each offset in the line if offset is 0, push line to outputLines else shift and push
    line.getOffsets().forEach(offset => {
      if(!this.isNoise(line.getFirst() + offset)){
        if(offset == 0){
          this.outputLines.addLine(line);
        }
        else{
          let tempLine = new Line(line.getFirst());
          tempOffsets.forEach((offset: number) => {
            tempLine.addOffset(offset);
          });

          this.outputLines.addLine(tempLine);
        }
      }

      tempOffsets.push(tempOffsets[0]);
      tempOffsets.shift();

    });
  }

  private isNoise(index: number): boolean{
    let tempWord = this.charactersArray.getWordByIndex(index).toLowerCase();
    let result = false;

    this.noiseWords.forEach(word => {
      if(tempWord === word){
        result = true;
      }
    });

    return result;
  }
}
