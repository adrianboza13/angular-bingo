import { Component, Input, OnInit } from '@angular/core';

import { AppComponent} from '../../app.component';
import { BingoCardService } from './card.service';
import { BingoGameStateService } from '../gameState/gameState.service'
import { GlobalStorage } from '../../lib/globalStorage.service';

@Component({
  selector: 'bingo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class BingoCardComponent implements OnInit {
    state: BingoGameStateService;
    card: BingoCardService;

    @Input() cardId: number;
    @Input() glob: number;

    constructor() {
    }

    ngOnInit() {
        let storage = new GlobalStorage();
        this.state = storage.fetch(this.glob, "game");
        this.card = this.state.players[this.cardId];
    }
}