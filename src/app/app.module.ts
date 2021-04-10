import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { Phase1Component } from './phase1/phase1.component';
import { Phase2Component } from './phase2/phase2.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [ 
    AppComponent,
    Phase1Component,
    Phase2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
   

  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
