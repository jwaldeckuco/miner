import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './controller/app-component/app.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AdminPanelComponent } from './controller/admin-panel/admin-panel.component';
import { ResultCardComponent } from './controller/result-card/result-card.component';
import { ExistingKeywordsCardComponent } from './controller/existing-keyword-card/existing-keywords-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    ResultCardComponent,
    ExistingKeywordsCardComponent,
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
