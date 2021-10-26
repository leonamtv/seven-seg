import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SevenSegmentComponent } from './components/seven-segment/seven-segment.component';
import { SevenSegmentDigitComponent } from './components/seven-segment-digit/seven-segment-digit.component';

@NgModule({
  declarations: [
    AppComponent,
    SevenSegmentComponent,
    SevenSegmentDigitComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
