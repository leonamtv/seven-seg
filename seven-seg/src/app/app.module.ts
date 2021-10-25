import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SevenSegmentComponent } from './components/seven-segment/seven-segment.component';

@NgModule({
  declarations: [
    AppComponent,
    SevenSegmentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
