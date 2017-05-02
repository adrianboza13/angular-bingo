import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { BingoBoardComponent } from './bingo/board/board.component';
import { BingoCardComponent } from './bingo/card/card.component';
import { BingoControlsComponent } from './bingo/controls/controls.component';
import { BingoStatusComponent } from './bingo/status/status.component';

import { RangePipe} from './lib/range.pipe';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BingoBoardComponent,
        BingoCardComponent,
        BingoControlsComponent,
        BingoStatusComponent,

        RangePipe
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'app works!'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app works!');
  // }));
  //
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});
