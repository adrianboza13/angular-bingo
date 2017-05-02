import { Component, Input, OnInit } from '@angular/core';

import { BingoGameStateService } from '../gameState/gameState.service';
import { GlobalStorage } from '../../lib/globalStorage.service';

@Component({
  selector: 'bingo-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class BingoStatusComponent implements OnInit {
    state: BingoGameStateService;

    @Input() glob: Number;

    constructor() {
    }

    ngOnInit() {
        let storage = new GlobalStorage();
        this.state = storage.fetch(this.glob, "game");
    }
}