import {Component, Input, OnInit} from '@angular/core';
import {KeywordPair} from "../../model/structures/keyword-pair";

@Component({
  selector: 'app-result-card',
  templateUrl: '../../view/result-card/result-card.component.html',
  styleUrls: ['../../view/result-card/result-card.component.css']
})
export class ResultCardComponent implements OnInit {
  @Input() keywordPair!: KeywordPair;

  constructor() { }

  ngOnInit(): void {}

  navigateToSite(){
    window.open(this.keywordPair.getUrl());
  }

}
