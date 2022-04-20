
import {Line} from "./line";

export class Indices {
  private lines: Array<Line>;
  private currentLine : number;
  private dev = false;

  constructor() {
    this.lines = [];
    this.currentLine = 0;
  }

  setIndex(first: number, offset: number){
    let line;

    if(this.hasIndex(first)){
      line = this.getLine(first);
      line.addOffset(offset);
    }
    else{
      line = new Line(first);
      line.addOffset(offset);
      this.addLine(line);
    }
  }

  addLine(line: Line){
    this.lines.push(line);
  }

  getNextIndex(){
    if(this.currentLine < this.lines.length){
      this.currentLine += 1;
      return this.lines[this.currentLine];
    }
    else{
      return -1;
    }
  }

  hasIndex(first: number){
    let index = -1;

    for(let i = 0; i < this.lines.length; ++i){
      if(this.lines[i].getFirst() == first){
        index = i;
        break;
      }
    }
    return index != -1;
  }

  private getLine(first: number) : Line {
    return this.lines.find(
      line => line.getFirst() == first
    )!;
  }

  getLines() : Array<Line>{
    this.devPrint("getIndices:");
    this.devPrint(this.lines);

    return [...this.lines];
  }

  reset(){
    this.lines.length = 0;
    this.currentLine = 0;
  }

  devPrint(message: any){
    if(this.dev){
      console.log("Indices")
      console.log(message);
    }
  }
}
