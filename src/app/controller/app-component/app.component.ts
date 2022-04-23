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
import {ImprovedArray} from "../../model/structures/improved-array";

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

    this.state.startTimer();

    this.keywordPairs.setFinishedFlag(false);

    TestCases.getCases().forEach(keywordPair => {
      this.keywordPairs.addKeywordPair(keywordPair);
    });

    this.keywordPairs.setFinishedFlag(true);

    this.state.stopTimer();
  }

  ngOnInit(): void { }

  toggleAdminMode(){
    this.devPrinter.setFunctionName("toggleAdminMode");
    this.devPrinter.printMessage("toggling adminMode");

    this.state.toggleAdmin();
    this.update();
  }

  onAdminKeywordChange(){
    if(this.newKeywordInput.value !== "" && this.newUrlInput.value !== ""){
      this.state.addKeywordButtonState = ButtonState.ENABLED;
    }
    else{
      this.state.addKeywordButtonState = ButtonState.DISABLED;
    }
  }

  onSearchKeywordChange(){
    this.devPrinter.setFunctionName("onSearchKeywordChange");

    if(this.searchKeywordInput.value === ""){
      this.state.searchButtonState = ButtonState.DISABLED;
    }
    else{
      this.state.searchButtonState = ButtonState.ENABLED;
    }
  }

  onAddKeywordButtonPressed(){
    this.devPrinter.setFunctionName("submitKeyword");

    this.state.startTimer();

    let pair = new KeywordPair(this.newKeywordInput.value, this.newUrlInput.value);
    this.keywordPairs.addKeywordPair(pair);
    this.keywordPairs.setFinishedFlag(true);

    this.newKeywordInput.setValue('');
    this.newUrlInput.setValue('');

    this.state.addKeywordButtonState = ButtonState.DISABLED;
    this.state.stopTimer();
  }

  onRemoveKeywordButtonPressed(pair: KeywordPair){
    this.devPrinter.setFunctionName("onRemoveKeywordButtonPressed");
    this.devPrinter.printMessage("removing keyword");
    this.devPrinter.printKeywordPair(pair);

    this.keywordPairs.removeKeywordPair(pair);

  }

  onSearchButtonPressed(){
    this.devPrinter.setFunctionName("onSearchButtonPressed");

    this.searchResults.clear();

    // get the search keyword and clear the input box
    this.searchWord = this.searchKeywordInput.value;
    this.searchKeywordInput.setValue("");

    this.devPrinter.printMessage("searching for " + this.searchWord);

    // disable the button
    this.state.searchButtonState = ButtonState.DISABLED;

    // search keywordPairs and set searchResults
    let temp = this.keywordPairs.search(this.searchWord);

    for(let i = 0; i < temp.length; i++){
      this.searchResults.addKeywordPair(temp.getElementByIndex(i));
    }

    this.searchWord = "";

    this.updateUserArea();
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

      this.updateUserArea();
    }
  }

  updateUserArea(){
    this.devPrinter.setFunctionName("update");

    this.state.resultsVisibility = this.searchResults.length > 0;
  }

  notify(event: KwicsEvent): any {
    this.devPrinter.setFunctionName("notify");
    this.devPrinter.printMessage("getting notification");

    this.update();
  }
}
