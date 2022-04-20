import {ProcessMode} from "./process-mode";
import {ArchType} from "./arch-type";

export class ManagerState {
  private _devMode: boolean;
  private _reverse: boolean;
  private _processMode: ProcessMode;
  private _archType: ArchType;

  constructor() {
    this._devMode = false;
    this._reverse = false;
    this._processMode = ProcessMode.SINGLE;
    this._archType = ArchType.IMPLICIT_INVOCATION;
  }

  get devMode(): boolean {
    return this._devMode;
  }

  set devMode(value: boolean) {
    this._devMode = value;
  }

  toggleDevMode(){
    this._devMode = !this._devMode;
  }

  get reverse(): boolean {
    return this._reverse;
  }

  set reverse(value: boolean) {
    this._reverse = value;
  }

  toggleReverse(){
    this._reverse = !this._reverse;
  }

  get processMode(): ProcessMode {
    return this._processMode;
  }

  set processMode(value: ProcessMode) {
    this._processMode = value;
  }

  get archType(): ArchType{
    return this._archType;
  }

  set archType(value: ArchType){
    this._archType = value;
  }



}
