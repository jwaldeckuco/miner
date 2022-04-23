import {Component, OnInit} from '@angular/core';
import {TestCases} from "../../model/test-cases";
import {FormControl} from "@angular/forms";
import {ListenerInterface} from "../../model/invocation/listen/listener-interface";
import {KwicsEvent} from "../../model/invocation/event/kwics-event";
import {KeywordsStorage} from "../../model/structures/keywords-storage";
import {KeywordPair} from "../../model/structures/keyword-pair";
import {AppComponentState} from "./app-component-state";
import {ButtonState} from "../../view/button-state";
import {KWICSManagerInvocation} from "../../model/kwicsmanager-invocation";
import {DevPrinter} from "../../model/dev/dev-printer";

@Component({
  selector: 'app-root',
  templateUrl: '../../view/app.component.html',
  styleUrls: ['../../view/app.component.css']
})

export class AppComponent implements OnInit, ListenerInterface {
  // TODO: update title
  title = 'Miner app';
  devPrinter: DevPrinter;

  // UI elements
  newKeywordInput = new FormControl('');
  newUrlInput = new FormControl('');
  searchKeywordInput = new FormControl('');

  // state
  state: AppComponentState;

  // data structs
  keywordPairs: KeywordsStorage;
  existingKeywords: KeywordsStorage;
  searchResults: KeywordsStorage;

  searchWord: string = "";

  // kwics system
  kwicsManager: KWICSManagerInvocation;

  constructor() {
    this.devPrinter = new DevPrinter("app");
    this.devPrinter.setPrint(true);

    this.state = new AppComponentState();

    this.keywordPairs = new KeywordsStorage();
    this.existingKeywords = new KeywordsStorage();
    this.searchResults = new KeywordsStorage();

    this.kwicsManager = new KWICSManagerInvocation(this.keywordPairs, this.existingKeywords);

    this.keywordPairs.register(this);
    this.existingKeywords.register(this);

    this.initialLoad();
  }

  initialLoad(){
    this.devPrinter.setFunctionName("initialLoad");

    this.devPrinter.printMessage("inserting existing keywords");

    this.keywordPairs.setFinishedFlag(false);

    TestCases.getCases().forEach(keywordPair => {
      this.keywordPairs.addKeywordPair(keywordPair);
    });

    this.keywordPairs.setFinishedFlag(true);
  }

  ngOnInit(): void { }

  toggleAdminMode(){
    this.devPrinter.setFunctionName("toggleAdminMode");
    this.devPrinter.printMessage("toggling adminMode");
    this.state.toggleAdmin();
    if(this.state.adminMode){
      this.update();
    }
  }

  onAdminKeywordChange(){
    if(this.newKeywordInput.value !== "" && this.newKeywordInput.value !== ""){
      this.state.addKeywordButtonState = ButtonState.ENABLED;
    }
    else{
      this.state.addKeywordButtonState = ButtonState.DISABLED;
    }
  }

  onSearchKeywordChange(){
    this.devPrinter.setFunctionName("onSearchKeywordChange");

    if(this.searchKeywordInput.value === ""){
      this.state.addKeywordButtonState = ButtonState.DISABLED;
    }
    else{
      this.state.addKeywordButtonState = ButtonState.ENABLED;
    }
  }

  onAddKeywordButtonPressed(){
    this.devPrinter.setFunctionName("submitKeyword");

    let pair = new KeywordPair(this.newKeywordInput.value, this.newUrlInput.value);
    this.keywordPairs.addKeywordPair(pair);
    this.keywordPairs.setFinishedFlag(true);

    this.newKeywordInput.setValue('');
    this.newUrlInput.setValue('');

    this.state.addKeywordButtonState = ButtonState.DISABLED;
  }

  onRemoveKeywordButtonPressed(pair: KeywordPair){
    this.devPrinter.setFunctionName("onRemoveKeywordButtonPressed");
    this.devPrinter.printMessage("removing keyword");
    this.devPrinter.printKeywordPair(pair);

    this.keywordPairs.removeKeywordPair(pair);
  }

  onSearchButtonPressed(){
    this.searchWord = this.searchKeywordInput.value;

    this.searchKeywordInput.setValue("");
  }

  // UI functions
  update(){
    this.devPrinter.setFunctionName("update");

    if(this.state.adminMode){
      this.devPrinter.printMessage("updating admin area")
      this.devPrinter.printMessage("existingKeywords.length: " + this.existingKeywords.length)
      this.state.existingKeywordsVisibility = this.existingKeywords.isEmpty();

    }
    else{
      this.devPrinter.printMessage("updating user area")
      this.updateSearch();
    }
  }

  updateSearch(){
    this.devPrinter.setFunctionName("update");

    this.state.resultsVisibility = this.existingKeywords.isEmpty();
  }

  notify(event: KwicsEvent): any {
    this.devPrinter.setFunctionName("notify");
    this.devPrinter.printMessage("getting notification");

    this.update();
  }
}
