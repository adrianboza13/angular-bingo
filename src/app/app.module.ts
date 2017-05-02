import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BingoBoardComponent } from './bingo/board/board.component';
import { BingoCardComponent } from './bingo/card/card.component';
import { BingoControlsComponent } from './bingo/controls/controls.component';
import { BingoStatusComponent } from './bingo/status/status.component';

import { RangePipe} from './lib/range.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BingoBoardComponent,
    BingoCardComponent,
    BingoControlsComponent,
    BingoStatusComponent,

    RangePipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
