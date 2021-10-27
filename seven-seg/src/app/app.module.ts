import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SevenSegmentComponent } from './components/seven-segment/seven-segment.component';
import { SevenSegmentDigitComponent } from './components/seven-segment-digit/seven-segment-digit.component';
import { SixteenSegmentComponent } from './components/sixteen-segment/sixteen-segment.component';
import { SixteenSegmentDigitComponent } from './components/sixteen-segment-digit/sixteen-segment-digit.component';

@NgModule({
  declarations: [
    AppComponent,
    SevenSegmentComponent,
    SevenSegmentDigitComponent,
    SixteenSegmentComponent,
    SixteenSegmentDigitComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
