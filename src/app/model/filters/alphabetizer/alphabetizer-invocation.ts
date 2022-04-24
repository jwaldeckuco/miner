import {KwicsFilterInvocation} from "../kwics-filter/kwics-filter-invocation";
import {KwicsEvent} from "../../invocation/event/kwics-event";
import {NoiseFilter} from "../noise-filter";
import {KeywordPair} from "../../structures/keyword-pair";
import {KeywordsStorage} from "../../structures/keywords-storage";
import {max} from "rxjs";

export class AlphabetizerInvocation extends KwicsFilterInvocation {
  private _noiseFilter: NoiseFilter | undefined;
  private _filtering: boolean;

  private charVals: number[][] = [];
  private greaterThan: number[] = [];
  private indices: number[] = [];

  constructor() {
    super("Alphabetizer");
    this._devPrinter?.setPrint(false);

    this._filtering = false;
  }

  setNoiseFiltering(filter: boolean) {
    this._devPrinter?.setFunctionName("setNoiseFiltering");

    this._filtering = filter;
    if (filter) {
      this._noiseFilter = new NoiseFilter();
    }
  }

  override process(event: KwicsEvent) {
    this._devPrinter!.setFunctionName("process");

    // if there is more than one keyword pair in input lines
    if (this.inputLines!.length > 1) {
      // get character values of each letter in each keyword
      for (let i = 0; i < this.inputLines!.length; ++i) {
        let temp: number[] = [];
        let words = this.inputLines?.getAtIndex(i).getKeyword();

        // convert each character in the keyword to an adjusted int value
        for (let j = 0; j < words.length; j++) {
          let tempChar = this.adjustCharCode(words.charCodeAt(j));

          // if tempchar is not whitespace, push it to the temp array
          if (tempChar >= 0) {
            temp.push(this.adjustCharCode(words.charCodeAt(j)));
          }
        }

        // push the temp array to the charVals array
        // basically the int value of each char in the keyword of inputLines[i]
        this.charVals.push([...temp]);
      }

      this.alphabetize();
      this.correlate();
      this.writeToOutputLines();
    }
    // only one keyword pair in input lines - push to output lines
    else {
      this.outputLines!.insert(this.inputLines!.read());
      this.outputLines!.setFinishedFlag(true);
    }
  }

  private alphabetize() {
    this._devPrinter!.setFunctionName("alphabetize");
    this._devPrinter!.printMessage("alphabetizing");

    this.greaterThan = [];

    // compare each keyword against all others to determine their sort order
    for (let i = 0; i < this.charVals.length; ++i) {
      let count = 0;

      for (let j = 0; j < this.charVals.length; ++j) {
        // if i == j, it would be comparing a keyword to itself, so
        // only compare when i !== j
        if (i !== j) {
          // if the keyword at inputLines[i] is larger than the keyword at inputLines[j]
          // increment count
          if (this.compareLineValues(i, j) === i) {
            count++;
          }
        }
      }

      // push the number of keywords this keyword is greater than to the
      // greater than array
      this.greaterThan.push(count);
    }
  }

  private compareLineValues(aIndex: number, bIndex: number) {
    this._devPrinter?.setFunctionName("compareLineValues")
    let a = this.charVals[aIndex];
    let b = this.charVals[bIndex];

    let index = a.length;
    let maxIndex = (a.length > b.length) ? a.length : b.length;
    this._devPrinter?.printMessage("comparing " + this.inputLines?.getAtIndex(aIndex) + " to " + this.inputLines?.getAtIndex(bIndex));

    for (let i = 0; i < index; ++i) {
      let result = a[i] - b[i];

      if (i === (index - 1)) {
        this._devPrinter?.printMessage("hit the end. a.length: " + a.length + "b.length: " + b.length)
        if (a.length > b.length) {
          this._devPrinter?.printMessage("hit the end. A is longer")
          return aIndex;
        } else {
          this._devPrinter?.printMessage("hit the end. B is longer:")
          return bIndex;
        }
      }
      else {
        if (result > 0) {
          return aIndex;
        }
        else if (result < 0) {
          return bIndex;
        }
      }
    }

    this._devPrinter?.printMessage("I'm not sure how it came to this")
    return 0;
  }

  private correlate() {
    this._devPrinter!.setFunctionName("correlate");

    this.indices = [];
    for (let i = 0; i < this.greaterThan.length; ++i) {
      this.indices.push(-1);
    }

    for (let i = 0; i < this.greaterThan.length; ++i) {
      this.indices[this.greaterThan[i]] = i;
    }
  }

  private adjustCharCode(a: number) {
    // A = 65, a = 97
    if (a >= 97) {
      return (a - 97) * 2;
    } else {
      return ((a - 65) * 2) + 1;
    }
  }

  private writeToOutputLines() {
    this._devPrinter?.setFunctionName("writeToOutputLines");

    this.outputLines!.setFinishedFlag(false);

    this.indices.forEach(index => {
      this._devPrinter?.printMessage("inserting " + this.inputLines!.getAtIndex(index).toString());
      this.outputLines!.insert(this.inputLines!.getAtIndex(index));
    });

    this.reset();
    this.outputLines!.setFinishedFlag(true);
  }

  reset() {
    this.inputLines?.clear();
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
