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
  dev = true;
  showKeywords: boolean = false;
  showResults: boolean = false;
  addButtonDisabled = true;
  resetButtonDisabled = true;

  constructor() {
  }

  ngOnInit(): void {
    if(this.dev){
      TestCases.getCases().forEach(keyword => {
        this.readInput(keyword);
        this.clearKeywordInput();
        this.updateKeywordsArea();
        this.updateResultsArea();
      });
    }
  }

  keywordChange(){
    this.addButtonDisabled = this.newKeywordInput.value === "";
  }

  submitKeyword(){
    let keyword: string = this.newKeywordInput.value;

    // if newKeywordInput has a value, process
    if (keyword.length > 0) {
      this.readInput(keyword);
      this.clearKeywordInput();
      this.update();

      this.addButtonDisabled = true;
      this.resetButtonDisabled = false;
    }
  }

  resetKeywords() {
    // clear keywords and results arrays
    this.keywords.length = 0;
    this.results.length = 0;

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
    // this.updateResultsArea();
  }

  updateKeywordsArea() {
    this.showKeywords = true;
  }

  updateResultsArea() {
    this.showResults = this.results.length !== 0;
  }

  devPrint(message: any){
    if(this.dev){
      console.log("App.js")
      console.log(message);
    }
  }
}
