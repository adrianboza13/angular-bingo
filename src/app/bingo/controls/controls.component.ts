import { Component, Input, OnInit } from '@angular/core';

import { BingoGameStateService } from '../gameState/gameState.service';
import { GlobalStorage } from '../../lib/globalStorage.service';

@Component({
  selector: 'bingo-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class BingoControlsComponent implements OnInit {
    state: BingoGameStateService;

    @Input() glob: Number;

    constructor() {
    }

    ngOnInit() {
        let storage = new GlobalStorage();
        this.state = storage.fetch(this.glob, "game");
    }

    next() {
        this.state.next();
    }

    reset() {
        this.state.reset();
    }
}