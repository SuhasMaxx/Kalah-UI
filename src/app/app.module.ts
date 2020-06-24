import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PitBlockComponent } from './pit-block/pit-block.component';
import { HttpClientModule } from '@angular/common/http';
import { TimerPipe } from './pipes/timer.pipe';
import { InterceptorModule } from './interceptor.module'

@NgModule({
  declarations: [
    AppComponent,
    PitBlockComponent,
    TimerPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InterceptorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
