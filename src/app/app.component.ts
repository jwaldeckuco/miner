import {Component, OnInit} from '@angular/core';
import {KWICSManager} from "./controller/kwicsmanager";
import {TestCases} from "./controller/test-cases";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'KWICS With Shared Data!!';

  keywords: string[] = [];
  results: string[] = [];

  kwicsManager = new KWICSManager();

  newKeywordInput = new FormControl('');
  // dev
  dev = false;
  showKeywords: boolean = false;
  showResults: boolean = false;
  addButtonDisabled = true;
  resetButtonDisabled = true;
  executionTime = 0;
  devMode = "Turn on Dev Mode";

  constructor() {
  }

  ngOnInit(): void {

  }

  devModeToggle(){
    this.dev = !this.dev;

    this.devMode = (this.dev) ? "Turn off Dev Mode" : "Turn on Dev Mode";

    if(this.dev){
      let startTime = performance.now();
      TestCases.getCases().forEach(keyword => {
        this.readInput(keyword);
        this.clearKeywordInput();
        this.update();
      });
      let stopTime = performance.now();
      this.executionTime = stopTime - startTime;
    }
    else{
      this.resetKeywords();
      this.executionTime = 0;
    }


  }

  keywordChange(){
    this.addButtonDisabled = this.newKeywordInput.value === "";
  }

  submitKeyword(){
    let startTime = performance.now();
    this.resetButtonDisabled = false;

    let keyword: string = this.newKeywordInput.value;

    // if newKeywordInput has a value, process
    if (keyword.length > 0) {
      this.readInput(keyword);
      this.clearKeywordInput();
      // this.updateKeywordsArea();
      // this.updateResultsArea();
      this.update();

      this.addButtonDisabled = true;
      this.resetButtonDisabled = false;
    }
    let stopTime = performance.now();
    this.executionTime = stopTime - startTime;
  }

  resetKeywords() {
    // clear keywords and results arrays
    this.keywords.length = 0;
    this.results.length = 0;
    this.kwicsManager.reset();

    this.clearKeywordInput();
    this.update();
    this.resetButtonDisabled = true;
  }

  readInput(line: string) {
    this.keywords.push(line);

    this.kwicsManager.input(this.keywords);
    this.results = this.kwicsManager.getOutput();
  }

  clearKeywordInput() {
    this.newKeywordInput.setValue("");
  }

  update(){
    this.updateKeywordsArea();
    this.updateResultsArea();
  }

  updateKeywordsArea() {
    this.showKeywords = true;
  }

  updateResultsArea() {
    this.showResults = this.results.length !== 0;
  }

}
