import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AdminPanelState} from "./admin-panel-state";
import {KeywordsStorage} from "../../model/structures/keywords-storage";
import {KeywordPair} from "../../model/structures/keyword-pair";
import {ButtonState} from "../../view/button-state";
import {TestCases} from "../../model/test-cases";
import {ListenerInterface} from "../../model/invocation/listen/listener-interface";
import {KwicsEvent} from "../../model/invocation/event/kwics-event";

@Component({
  selector: 'app-admin-panel',
  templateUrl: '../../view/admin-panel/admin-panel.component.html',
  styleUrls: ['../../view/admin-panel/admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit, ListenerInterface{
  state: AdminPanelState;

  @Input() keywords: KeywordsStorage | undefined;

  // UI elements
  keywordInput = new FormControl('');
  urlInput = new FormControl('');

  constructor() {
    this.state = new AdminPanelState();
    this.keywords?.register(this);
  }

  ngOnInit(): void {}

  submitKeyword(){
    if(this.keywordInput.value !== "" && this.urlInput.value !== ""){
      this.keywords?.insert(new KeywordPair(this.keywordInput.value, this.urlInput.value));
      this.update();
    }
  }

  devModeToggle(){
    this.state.toggleDevMode();
    //TODO: update the dev mode trigger
  }

  runDevMode(){

    // this.state.startTimer();

    TestCases.getCases().forEach(keywordPair => {
      this.keywordInput.setValue(keywordPair.getKeyword());
      this.urlInput.setValue(keywordPair.getUrl());
      this.submitKeyword();
    });

    this.clearKeywordInput();
    // this.state.stopTimer();
    this.update();
  }

  onKeywordChange(){
    if(this.keywordInput.value !== "" && this.keywordInput.value !== ""){
      this.state.addButtonState = ButtonState.ENABLED;
    }
    else{
      this.state.addButtonState = ButtonState.DISABLED;
    }
  }

  update(){
    this.updateKeywordsArea();

    this.keywordInput.setValue("");
    this.urlInput.setValue("");

    this.state.addButtonState = ButtonState.DISABLED;
  }

  updateKeywordsArea(){
    if(this.keywords!.length > 0){
      this.state.keywordsVisibility = true;
    }
  }


  clearKeywordInput() {
    this.keywordInput.setValue("");
  }

  clearUrlInput(){

    this.urlInput.setValue('');
  }

  notify(event: KwicsEvent): any {
    this.update();
  }
}
