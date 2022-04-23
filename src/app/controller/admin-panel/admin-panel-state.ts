
import {ButtonState} from "../../view/button-state";

export class AdminPanelState {
  private _devMode: boolean;
  private _addButtonState: boolean = true;
  private _resetButtonState: boolean = true;
  private _devModeString: string = "Turn on Dev Mode";
  private _admin: boolean = false;
  private _adminButtonString: string = "Turn on Admin Mode";
  private _keywordsVisibility: boolean = false;

  constructor() {
    this._devMode = false;
    this._addButtonState = false;
    this._resetButtonState = false;
    this._devModeString = "Turn Dev Mode on";
    this._admin = false;
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
