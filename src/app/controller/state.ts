import {PerformanceTimer} from "./performance-timer";
import {ButtonState} from "../view/button-state";

export class State {
  private _timer: PerformanceTimer;
  private _devMode: boolean;
  private _keywordsVisibility: boolean = false;
  private _resultsVisibility: boolean = false;
  private _addButtonState: boolean = true;
  private _resetButtonState: boolean = true;
  private _executionTime: number = 0;
  private _devModeString: string = "Turn on Dev Mode";


  constructor() {
    this._timer = new PerformanceTimer();
    this._devMode = false;
    this._keywordsVisibility = false;
    this._resultsVisibility = false;
    this._addButtonState = false;
    this._resetButtonState = false;
    this._executionTime = 0;
    this._devModeString = "Turn Dev Mode on";
  }

  startTimer(){
    this._timer.start();
  }

  stopTimer(){
    this._timer.stop();
    this._executionTime = this._timer.getTotalTime();
  }

  set devMode(value: boolean) {
    this._devMode = value;
    this.updateDevModeString();
  }

  get devMode(): boolean {
    return this._devMode;
  }

  toggleDevMode(){
    this._devMode = !this._devMode;
    this.updateDevModeString();
  }

  set keywordsVisibility(value: boolean) {
    this._keywordsVisibility = value;
  }

  get keywordsVisibility(): boolean {
    return this._keywordsVisibility;
  }

  toggleKeywordsVisibility(){
    this._keywordsVisibility = !this._keywordsVisibility;
  }

  set resultsVisibility(value: boolean) {
    this._resultsVisibility = value;
  }

  get resultsVisibility(): boolean {
    return this._resultsVisibility;
  }

  toggleResultsVisibility(){
    this._resultsVisibility = !this._resultsVisibility;
  }

  set addButtonState(value: ButtonState) {
    this._addButtonState = value !== ButtonState.DISABLED;
  }

  get addButtonState(): ButtonState{
    if(this._addButtonState){
      return ButtonState.ENABLED;
    }
    else{
      return ButtonState.DISABLED;
    }
  }

  toggleAddButtonState(){
    this._addButtonState = !this._addButtonState;
  }

  set resetButtonState(value: ButtonState) {
    this._resetButtonState = value !== ButtonState.DISABLED;
  }

  get resetButtonState(): ButtonState {
    if(this._resetButtonState){
      return ButtonState.ENABLED;
    }
    else{
      return ButtonState.DISABLED;
    }
  }

  toggleResetButtonState(){
    this._resetButtonState = !this._resetButtonState;
  }

  set executionTime(value: number) {
    this._executionTime = value;
  }

  get executionTime(): number {
    return this._executionTime;
  }

  resetTimer(){
    this._timer.reset();
    this.executionTime = 0;
  }

  set devModeString(value: string) {
    this._devModeString = value;
  }

  get devModeString(): string {
    return this._devModeString;
  }

  updateDevModeString(){
    if(this._devMode){
      this._devModeString = "Turn Dev Mode off";
    }
    else{
      this._devModeString = "Turn Dev Mode on";
    }
  }
}
