import {PerformanceTimer} from "./performance-timer";
import {ButtonState} from "../../view/button-state";

export class AppComponentState {
  private _timer: PerformanceTimer;
  private _devMode: boolean;
  private _adminMode: boolean = false;
  private _executionTime: number = 0;

  // element visibility
  private _adminAreaVisibility: boolean = false;
  private _userAreaVisibility: boolean = true;
  private _existingKeywordsVisibility: boolean = false;
  private _searchAreaVisibility: boolean = true;
  private _resultsVisibility: boolean = false;

  // button states
  private _adminButtonString: string = "Turn on Admin Mode";
  private _addKeywordButtonState: boolean = true;
  private _resetButtonState: boolean = true;
  private _searchButtonState: boolean = false;
  private _devModeString: string = "Turn on Dev Mode";

  constructor() {
    this._timer = new PerformanceTimer();
    this._devMode = false;
    this._existingKeywordsVisibility = false;
    this._resultsVisibility = false;
    this._addKeywordButtonState = false;
    this._resetButtonState = false;
    this._executionTime = 0;
    this._devModeString = "Turn Dev Mode on";
    this._adminMode = false;
  }

  // TIMER
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

  startTimer(){
    this._timer.start();
  }

  stopTimer(){
    this._timer.stop();
    this._executionTime = this._timer.getTotalTime();
  }

  // DEV MODE
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

  // VISIBILITY
  // - user area
  get userAreaVisibility(): boolean {
    return this._userAreaVisibility;
  }

  set userAreaVisibility(value: boolean){
    this._userAreaVisibility = value;
  }

  toggleUserAreaVisibility(){
    this._userAreaVisibility = !this.userAreaVisibility;
  }

  // - existing keywords
  set existingKeywordsVisibility(value: boolean) {
    this._existingKeywordsVisibility = value;
  }

  get existingKeywordsVisibility(): boolean {
    return this._existingKeywordsVisibility;
  }

  toggleExistingKeywordsVisibility(){
    this._existingKeywordsVisibility = !this._existingKeywordsVisibility;
  }

  // - results visibility
  set resultsVisibility(value: boolean) {
    this._resultsVisibility = value;
  }

  get resultsVisibility(): boolean {
    return this._resultsVisibility;
  }

  toggleResultsVisibility(){
    this._resultsVisibility = !this._resultsVisibility;
  }

  // BUTTON STATES
  // - add keyword button
  set addKeywordButtonState(value: ButtonState) {
    this._addKeywordButtonState = value !== ButtonState.DISABLED;
  }

  get addKeywordButtonState(): ButtonState{
    if(this._addKeywordButtonState){
      return ButtonState.ENABLED;
    }
    else{
      return ButtonState.DISABLED;
    }
  }

  toggleAddKeywordButtonState(){
    this._addKeywordButtonState = !this._addKeywordButtonState;
  }

  // - reset button
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

  // - search button
  set searchButtonState(value: ButtonState){
    if(value === ButtonState.DISABLED){
      this._searchButtonState = false;
    }
    else{
      this._searchButtonState = true;
    }
  }

  get searchButtonState(): ButtonState {
    if(this._searchButtonState){
      return ButtonState.ENABLED;
    }
    else{
      return ButtonState.DISABLED;
    }
  }

  toggleSearchButtonState() {
    this._searchButtonState = !this._searchButtonState;
  }

  toggleResetButtonState(){
    this._resetButtonState = !this._resetButtonState;
  }

  // MODES
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

  set adminMode(value: boolean) {
    this._adminMode = value;

    if(this._adminMode){
      this._userAreaVisibility = false;
    }
    else{
      this._userAreaVisibility = true;
    }
  }

  get adminMode(): boolean {
    return this._adminMode;
  }

  toggleAdmin(){
    this._adminMode = !this.adminMode;
    this.updateAdminButtonString();
    this.userAreaVisibility = !this._adminMode;
  }

  get adminButtonString(): string {
    return this._adminButtonString;
  }

  updateAdminButtonString(){
    if(this._adminMode){
      this._adminButtonString = "Turn off Admin Mode";
    }
    else{
      this._adminButtonString = "Turn on Admin Mode";
    }
  }
}
