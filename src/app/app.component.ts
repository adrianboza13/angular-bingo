import { Component } from '@angular/core';

import { BingoGameStateService } from './bingo/gameState/gameState.service';
import { GlobalStorage } from './lib/globalStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    state;
    bingoBalls = [];
    cards = [];
    glob;

    constructor() {
        let storage = new GlobalStorage();
        this.glob = storage.getNewGlob();

        this.state = new BingoGameStateService();
        this.state.addPlayer();
        this.state.markPlayerReady(0);

        storage.store(this.glob, "game", this.state);
    }
}
