import {KwicsFilterShared} from "./filters/kwics-filter/kwics-filter-shared";
import {Characters} from "./structures/characters";
import {Indices} from "./structures/indices";
import {InputShared} from "./filters/input/input-shared";
import {CircularShifter} from "./filters/shifter/circular-shifter";
import {AlphabetizerShared} from "./filters/alphabetizer/alphabetizer-shared";
import {Output} from "./filters/output/output";
import {ListenerInterface} from "./invocation/listen/listener-interface";
import {KwicsEvent} from "./invocation/event/kwics-event";
import {EventType} from "./invocation/event/event-type";
import {KeywordPair} from "./structures/keyword-pair";
import {ManagerState} from "./manager-state/manager-state";
import {ArchType} from "./manager-state/arch-type";

export class KWICSManager implements ListenerInterface{
  private _state: ManagerState;
  // private dev = true;
  // private reverse = false;

  // filters
  private inputFilter!: any;
  private shifter!: CircularShifter;
  private alphabetizer!: KwicsFilterShared;
  private output!: any;

  //shared data
  inputLines!: string[];
  characters!: Characters;
  index!: Indices;
  shiftedIndex!: Indices;
  alphaIndex!: Indices;
  outlines!: Array<string>;

  constructor(){
    // state arch type defaults to Implicit Invocation, so no need to set it manually
    this._state = new ManagerState();

    this.createDataStructures();
    this.createFilters();
  }

  createDataStructures(){
    this.inputLines = [];
    this.characters = new Characters();
    this.index = new Indices();
    this.shiftedIndex = new Indices();
    this.alphaIndex = new Indices();
    this.outlines = [];
  }

  createFilters(){
    this.inputFilter = new InputShared(this.inputLines, this.index, this.characters);

    if(!this._state.reverse){
      this.shifter = new CircularShifter(this.index, this.shiftedIndex, this.characters);
      this.alphabetizer = new AlphabetizerShared(this.shiftedIndex, this.alphaIndex, this.characters);
    }
    else{
      this.alphabetizer = new AlphabetizerShared(this.index, this.shiftedIndex, this.characters);
      this.shifter = new CircularShifter(this.shiftedIndex, this.alphaIndex, this.characters);
    }

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
    if(!this._state.reverse){
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

  // input(lines: Array<string>){
  //   this.reset();
  //
  //   this.inputFilter.setInputLines(lines);
  //   this.inputFilter.process();
  //
  //   if(!this.reverse){
  //     this.shifter.process();
  //     this.alphabetizer.process();
  //   }
  //   else{
  //     console.log("reversed")
  //     this.alphabetizer.process();
  //     this.shifter.process();
  //   }
  //
  //   this.output.process();
  // }
  //
  // pass(){
  // }

  insert(pair: KeywordPair){
    this.reset();

    this.inputFilter.setInputLines(pair);
    this.inputFilter.process();

    if(!this._state.reverse){
      this.shifter.process();
      this.alphabetizer.process();
    }
    else{
      console.log("reversed")
      this.alphabetizer.process();
      this.shifter.process();
    }

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

  notify(event: KwicsEvent): any {
    if(event.eventType == EventType.KEYWORD_INPUT_EVENT){

    }
  }
}
