import {Component, Input, OnInit} from '@angular/core';
import {KeywordPair} from "../../model/structures/keyword-pair";

@Component({
  selector: 'app-existing-keywords-card',
  templateUrl: '../../view/existing-keyword-card/existing-keywords-card.component.html',
  styleUrls: ['../../view/existing-keyword-card/existing-keywords-card.component.css']
})
export class ExistingKeywordsCardComponent implements OnInit {
  @Input() pair!: KeywordPair;

  constructor() { }

  ngOnInit(): void {
  }

}
