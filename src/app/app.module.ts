import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';

import { AppComponent } from './app.component';
import { FrameComponent } from './frame/frame.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScoresheetComponent } from './scoresheet/scoresheet.component';


@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    ScoresheetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
