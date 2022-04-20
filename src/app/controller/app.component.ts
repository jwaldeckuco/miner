import {Component, OnInit} from '@angular/core';
import {KWICSManager} from "../model/kwicsmanager";
import {TestCases} from "../model/test-cases";
import {FormControl} from "@angular/forms";
import {ListenerInterface} from "../model/invocation/listen/listener-interface";
import {KwicsEvent} from "../model/invocation/event/kwics-event";
import {KeywordsStorage} from "../model/structures/keywords-storage";
import {ListenableInterface} from "../model/invocation/listen/listenable-interface";
import {EventType} from "../model/invocation/event/event-type";
import {KeywordPair} from "../model/structures/keyword-pair";
import {ImprovedArray} from "../model/structures/improved-array";
import {State} from "./state";
import {ButtonState} from "../view/button-state";
import {KWICSManagerInvocation} from "../model/kwicsmanager-invocation";
import {DevPrinter} from "../model/dev/dev-printer";

@Component({
  selector: 'app-root',
  templateUrl: '../view/app.component.html',
  styleUrls: ['../view/app.component.css']
})

export class AppComponent implements OnInit, ListenerInterface {
  // TODO: update title
  title = 'Miner app';
  devPrinter: DevPrinter;

  // data structs
  keywordPairs: KeywordsStorage;
  results: KeywordsStorage;

  // kwics system
  kwicsManager: KWICSManagerInvocation;
  listeners: ImprovedArray;

  // UI elements
  keywordInput = new FormControl('');
  urlInput = new FormControl('');

  // state
  state: State;

  constructor() {
    this.devPrinter = new DevPrinter("app");
    this.devPrinter.setPrint(true);

    this.keywordPairs = new KeywordsStorage();
    this.results = new KeywordsStorage();

    this.listeners = new ImprovedArray();
    this.state = new State();

    this.kwicsManager = new KWICSManagerInvocation(this.keywordPairs, this.results);
  }

  registerListeners(){
    this.devPrinter.setFunctionName("registerListeners");
    this.results.register(this);
  }

  ngOnInit(): void { }

  devModeToggle(){
    this.devPrinter.setFunctionName("devModeToggle");

    this.state.toggleDevMode();

    if(this.state.devMode){
      this.runDevMode();
    }
    else{
      this.resetKeywords();
      this.state.resetTimer();
    }
  }

  runDevMode(){
    this.devPrinter.setFunctionName("runDevMode");

    this.state.startTimer();

    TestCases.getCases().forEach(keyword => {
      this.keywordInput.setValue(keyword);
      this.urlInput.setValue("farts.com");
      this.submitKeyword();
    });

    this.clearKeywordInput();
    this.state.stopTimer();
    this.update();
  }

  onKeywordChange(){
    this.devPrinter.setFunctionName("onKeywordChange");

    if(this.keywordInput.value === ""){
      this.state.addButtonState = ButtonState.DISABLED;
    }
    else{
      this.state.addButtonState = ButtonState.ENABLED;
    }
  }

  submitKeyword(){
    this.devPrinter.setFunctionName("submitKeyword");

    if (this.keywordInput.value !== "") {
      this.readInput();

      this.clearKeywordInput();
      this.clearUrlInput();
      this.state.addButtonState = ButtonState.DISABLED;
      this.state.resetButtonState = ButtonState.ENABLED;

      // this.update();
    }
  }

  readInput() {
    this.devPrinter.setFunctionName("readInput");

    let pair = new KeywordPair(this.keywordInput.value, this.urlInput.value);

    this.devPrinter.printKeywordPair(pair);

    this.keywordPairs.addKeywordPair(pair);
    this.keywordPairs.setFinishedFlag(true);

    // this.results = this.kwicsManager.getOutput();
  }

  resetKeywords() {
    this.devPrinter.setFunctionName("resetKeywords");

    this.keywordPairs.clear();
    this.results.clear();

    this.kwicsManager.reset();

    this.clearKeywordInput();
    this.clearUrlInput();
    this.update();
    this.state.resetButtonState = ButtonState.DISABLED;
  }

  // UI functions
  update(){
    this.devPrinter.setFunctionName("update");

    this.updateKeywordsArea();
    this.updateResultsArea();

  }

  // individual UI Element functions
  clearKeywordInput() {
    this.devPrinter.setFunctionName("clearKeywordInput");

    this.keywordInput.setValue("");
  }

  clearUrlInput(){
    this.devPrinter.setFunctionName("clearUrlInput");

    this.urlInput.setValue('');
  }

  updateKeywordsArea() {
    this.devPrinter.setFunctionName("updateKeywordsArea");

    this.state.keywordsVisibility = true;
  }

  updateResultsArea() {
    this.devPrinter.setFunctionName("updateResultsArea");

    this.state.resultsVisibility = this.results.isEmpty();
  }

  // implicit invocation functions
  // from listenable interface
  // updateListeners(event: KwicsEvent){
  //   this.devPrinter.setFunctionName("updateListeners");
  //
  //   this.listeners.forEach(listener => {
  //     listener.notify(event);
  //   });
  // }
  //
  // unregister(listener: ListenerInterface): any {
  //   this.devPrinter.setFunctionName("unregister");
  //
  //   this.listeners.remove(listener);
  // }
  //
  // register(listener: ListenerInterface): any {
  //   this.devPrinter.setFunctionName("register");
  //
  //   this.listeners.add(listener);
  // }

  notify(event: KwicsEvent): any {
    this.update();
  }
}
