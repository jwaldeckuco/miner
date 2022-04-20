
import {ListenerInterface} from "./invocation/listen/listener-interface";
import {KwicsEvent} from "./invocation/event/kwics-event";
import {EventType} from "./invocation/event/event-type";
import {KeywordPair} from "./structures/keyword-pair";
import {ManagerState} from "./manager-state/manager-state";
import {ArchType} from "./manager-state/arch-type";
import {InputInvocation} from "./filters/input/input-invocation";
import {KwicsFilterInvocation} from "./filters/kwics-filter/kwics-filter-invocation";
import {ShifterInvocation} from "./filters/shifter/shifter-invocation";
import {ListenableStorage} from "./structures/listenable-storage";
import {KeywordsStorage} from "./structures/keywords-storage";
import {AlphabetizerInvocation} from "./filters/alphabetizer/alphabetizer-invocation";
import {OutputInvocation} from "./filters/output/output-invocation";

export class KWICSManagerInvocation implements ListenerInterface{
  private _state: ManagerState;

  // filters
  private inputFilter!: any;
  private shifter!: ShifterInvocation;
  private alphabetizer!: AlphabetizerInvocation;
  private output!: any;

  //shared data
  inputKeywordPairs: KeywordsStorage;
  inputLines!: ListenableStorage;
  shiftedLines!: ListenableStorage;
  alphaLines!: ListenableStorage;
  outputKeywordPairs: KeywordsStorage;

  constructor(inputKeywords: KeywordsStorage, outputKeywords: KeywordsStorage){
    // state arch type defaults to Implicit Invocation, so no need to set it manually
    this._state = new ManagerState();

    this.inputKeywordPairs = inputKeywords;
    this.outputKeywordPairs = outputKeywords;

    this.createDataStructures();
    this.createFilters();
    this.configureFilters();
  }

  createDataStructures(){
    this.inputLines = new ListenableStorage();
    this.shiftedLines = new ListenableStorage();
    this.alphaLines = new ListenableStorage();
  }

  createFilters(){
    this.inputFilter = new InputInvocation();
    this.shifter = new ShifterInvocation();
    this.alphabetizer = new AlphabetizerInvocation();
    this.output = new OutputInvocation();
  }

  configureFilters(){
    this.inputFilter.setInputLines(this.inputKeywordPairs);
    this.inputFilter.setOutputLines(this.inputLines);

    this.shifter.setOutputLines(this.shiftedLines);
    this.alphabetizer.setOutputLines(this.alphaLines);
    this.output!.setOutputLines(this.outputKeywordPairs);

    this.setReverse();
  }

  setReverse(){
    if(!this._state.reverse){
      this.shifter.setInputLines(this.inputLines);
      this.shifter.setNoiseFiltering(true);

      this.alphabetizer.setInputLines(this.shiftedLines);
      this.output.setInputLines(this.alphaLines);
    }
    else{
      // reverse order
      this.shifter.setInputLines(this.alphaLines);
      this.alphabetizer.setInputLines(this.inputLines);
      this.alphabetizer.setNoiseFiltering(true);
      this.output.setInputLines(this.shiftedLines);
    }
  }

  pass(){ }

  getOutput(){
    // return [...this.outlines];
  }

  reset(){
    this.inputLines.reset();
    this.shiftedLines.reset();
    this.alphaLines.reset();
  }

  notify(event: KwicsEvent): any {
  }
}
