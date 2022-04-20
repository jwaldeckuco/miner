
import {KwicsFilterInvocation} from "../kwics-filter/kwics-filter-invocation";
import {KwicsEvent} from "../../invocation/event/kwics-event";
import {NoiseFilter} from "../noise-filter";
import {KeywordPair} from "../../structures/keyword-pair";
import {KeywordsStorage} from "../../structures/keywords-storage";

export class AlphabetizerInvocation extends KwicsFilterInvocation{
  private _noiseFilter: NoiseFilter | undefined;
  private _filtering: boolean;

  private charVals: number[][] = [];
  private greaterThan: number[] = [];
  private indices: number[] = [];

  constructor() {
    super("Alphabetizer");
    this._filtering = false;
  }

  setNoiseFiltering(filter: boolean){
    this._devPrinter?.setFunctionName("setNoiseFiltering");

    this._filtering = filter;
    if(filter){
      this._noiseFilter = new NoiseFilter();
    }
  }

  override process(event: KwicsEvent){
    this._devPrinter!.setFunctionName("process");
    console.log(this.inputLines);



    if(this.inputLines!.length > 1){
      this.pushCharValues();
      this.alphabetize();
      this.correlate();
      this.writeToOutputLines();
    }
    else{
      this.outputLines!.insert(this.inputLines!.read());
      this.outputLines!.setFinishedFlag(true);
    }
  }

  private pushCharValues(){
    this._devPrinter?.setFunctionName("pushToCharValues");

    for(let i = 0; i < this.inputLines!.length; ++i){
      let temp: number[] = [];
      let words = this.inputLines?.getAtIndex(i).getKeyword();

      for(let j = 0; j < words.length; j++){
        let tempChar = this.adjustCharCode(words.charCodeAt(j));

        if(tempChar >= 0){
          temp.push(this.adjustCharCode(words.charCodeAt(j)));
        }
      }

      this.charVals.push([...temp]);
    }
  }

  private alphabetize(){
    this._devPrinter!.setFunctionName("alphabetize");
    this._devPrinter!.printMessage("alphabetizing");


    this.outputLines!.setFinishedFlag(false);
    this.greaterThan = [];

    for(let i = 0; i < this.charVals.length; ++i){
      let largerThan = 0;

      for(let j = 0; j < this.charVals.length; ++j){
        if(i !== j){
          if(this.compareLineValues(i, j) === i){
            largerThan++;
          }
        }
      }

      this.greaterThan.push(largerThan);
    }
    console.log(this.greaterThan)
  }

  private correlate(){
    this._devPrinter!.setFunctionName("correlate");

    this.indices = [];
    for(let i = 0; i < this.greaterThan.length; ++i){
      this.indices.push(-1);
    }

    for(let i = 0; i < this.greaterThan.length; ++i){
      this.indices[this.greaterThan[i]] = i;
    }
  }

  private compareLineValues(aIndex: number, bIndex: number){
    let a = this.charVals[aIndex];
    let b = this.charVals[bIndex];

    let index = (a.length < b.length) ? a.length : b.length;

    for(let i = 0; i < index; ++i){
      let result = this.compareCharValues(a[i], b[i]);

      if(result > 0){
        console.log(a + " is larger than " + b)
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
      return (a - 97) * 2;
    }
    else{
      return ((a - 65) * 2) + 1;
    }
  }

  private writeToOutputLines(){
    this._devPrinter?.setFunctionName("writeToOutputLines");

    this.outputLines!.setFinishedFlag(false);

    this.indices.forEach(index => {
      this.outputLines!.insert(this.inputLines!.getAtIndex(index));
    });

    this.outputLines!.setFinishedFlag(true);
  }

  reset(){
    this.charVals = [];
    this.greaterThan = [];
    this.indices = [];
  }

  notify(event: KwicsEvent): any {
    this._devPrinter?.setFunctionName("notify");
    this._devPrinter?.printMessage("getting notification");

    this.process(event);
  }
}
