import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgDragDropModule} from 'ng-drag-drop';


import { AppComponent } from './app.component';
import {CommonService} from './shared/services/common.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgDragDropModule.forRoot()
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
