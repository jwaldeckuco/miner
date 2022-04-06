
import {KWICSFilter} from "./kwics-filter";
import {Characters} from "../model/characters";
import {Indices} from "../model/indices";
import {Input} from "./input";
import {CircularShifter} from "./circular-shifter";
import {Alphabetizer} from "./alphabetizer";
import {Output} from "./output";

export class KWICSManager{
  private dev = true;
  private reverse = false;

  // filters
  private inputFilter!: any;
  private shifter!: CircularShifter;
  private alphabetizer!: KWICSFilter;
  private output!: any;

  //shared data
  inputLines!: string[];
  characters!: Characters;
  index!: Indices;
  shiftedIndex!: Indices;
  alphaIndex!: Indices;
  outlines!: Array<string>;

  constructor(){
    this.createSharedData();
    this.createFilters();
  }

  createSharedData(){
    this.inputLines = [];
    this.characters = new Characters();
    this.index = new Indices();
    this.shiftedIndex = new Indices();
    this.alphaIndex = new Indices();
    this.outlines = [];
  }

  createFilters(){
    this.inputFilter = new Input(this.inputLines, this.index, this.characters);
    this.shifter = new CircularShifter(this.index, this.shiftedIndex, this.characters);
    this.alphabetizer = new Alphabetizer(this.shiftedIndex, this.alphaIndex, this.characters);
    this.output = new Output(this.alphaIndex, this.outlines, this.characters);
  }

  configureFilters(){
    this.setReverse();

    this.inputFilter!.setCharactersArray(this.characters);
    this.inputFilter!.setOutputLines(this.index);

    this.shifter!.setCharactersArray(this.characters);
    this.alphabetizer!.setCharactersArray(this.characters);

    this.output!.setCharactersArray(this.characters);
    this.output!.setInputLines(this.alphaIndex);
    this.output!.setOutputLines(this.outlines);
  }

  setReverse(){
    if(!this.reverse){
      this.shifter.setInputLines(this.index);
      this.shifter.setOutputLines(this.shiftedIndex);

      this.alphabetizer.setInputLines(this.shiftedIndex);
      this.alphabetizer.setOutputLines(this.alphaIndex);
    }
    else{
      // reverse order
      this.shifter.setInputLines(this.shiftedIndex);
      this.shifter.setOutputLines(this.alphaIndex);

      this.alphabetizer.setInputLines(this.index);
      this.alphabetizer.setOutputLines(this.shiftedIndex);
    }
  }

  input(lines: Array<string>){

    this.reset();

    this.inputFilter.setInputLines(lines);
    this.inputFilter.process();
    this.shifter.process();
    this.alphabetizer.process();
    this.output.process();
  }

  pass(){
  }

  // Returns an array of the sorted keyword strings
  getOutput(){
    return [...this.outlines];
  }

  reset(){
    this.characters.reset();
    this.index.reset();
    this.alphaIndex.reset();
    this.shiftedIndex.reset();
    this.outlines.length = 0;
  }
}
