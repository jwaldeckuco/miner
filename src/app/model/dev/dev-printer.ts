import {KeywordPair} from "../structures/keyword-pair";

export class DevPrinter {
  private _moduleName: string;
  private _functName: string;
  private _print: boolean;
  private _prefix: string = "";

  constructor(moduleName: string) {
    this._moduleName = moduleName;
    this._functName = "constructor";
    this._updatePrefix()
    this._print = true;
  }

  private _updatePrefix(){
    this._prefix = this._moduleName + "." + this._functName + ": ";
  }

  setFunctionName(functionName: string){
    this._functName = functionName;
    this._updatePrefix();
  }

  setPrint(value: boolean){
    this._print = value;
  }

  printKeywordPair(keywordPair: KeywordPair){
    if(this._print){
      console.log(this._prefix + keywordPair.getKeyword() + ", " + keywordPair.getUrl());
    }
  }

  printMessage(message: string){
    if(this._print){
      console.log(this._prefix + message);
    }
  }
}
