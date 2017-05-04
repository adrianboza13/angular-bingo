import { Component, Input, OnInit } from '@angular/core';

import { BingoGameStateService } from '../gameState/gameState.service';
import { GlobalStorage } from '../../lib/globalStorage.service';

@Component({
  selector: 'bingo-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BingoBoardComponent implements OnInit {
    state: BingoGameStateService;

    @Input() glob: number;

    constructor() {
    }

    ngOnInit() {
        let storage = new GlobalStorage();
        this.state = storage.fetch(this.glob, "game");
    }
}