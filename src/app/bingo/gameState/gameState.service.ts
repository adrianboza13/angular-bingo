import { Injectable } from '@angular/core';

import { BingoCardService } from '../card/card.service';

@Injectable()
export class BingoGameStateService {
    selectedNumbers: number[] = [];
    used = {};
    players : BingoCardService[] = [];
    status = "Game is loading...";
    winner : any = undefined;

    removedPlayers : number[] = [];

    constructor() {
        this.updateStatus("Press reset to start a new game");
        this.winner = -1;
    }

    addPlayer() {
        this.players.push(new BingoCardService(this));
    }

    removePlayer(id: number) {
        if (this.players[id] === undefined) {
            throw new Error("Invalid players");
        }

        this.players[id].markLeaving();
    }

    markPlayerReady(id: number) {
        if (this.players[id] === undefined) {
            throw new Error("Invalid players");
        }

        this.players[id].markReady();
    }

    markPlayerInactive(id: number) {
        if (this.players[id] === undefined) {
            throw new Error("Invalid players");
        }

        this.players[id].markInactive();
    }

    getPlayerCount() {
        let count = 0;
        for (let i in this.players) {
            if (this.players[i] !== undefined) {
                count++;
            }
        }

        return count;
    }

    getActivePlayerCount() {
        let count = 0;
        for (let i in this.players) {
            if (this.players[i].isActive) {
                count++;
            }
        }

        return count;
    }

    next() {
        if (this.winner !== undefined) {
            this.updateStatus(
                [
                    "Please press the reset button to start a new game",
                    "This game has ended, please press the reset button to start a new game",
                    "There is no next number in this game as the game has been ended, press the reset button to start a new game"
                ][Math.floor(Math.random() * 3)]
            );
            return;
        }

        if (this.selectedNumbers.length < 100) {
            this.selectNextNumber();
            this.updateStatus("Number " + this.selectedNumbers[this.selectedNumbers.length - 1] +
            " got selected as number " + this.selectedNumbers.length);
        } else {
            this.updateStatus("There are no numbers left to be selected");
        }

        for (let i in this.players) {
            if (this.players[i].isBingo(this.selectedNumbers)) {
                this.winner = true;
                this.status = "We have a winner";
                return;
            }
        }
    }

    reset() {
        this.winner = undefined;
        this.used = {};
        this.selectedNumbers = [];

        for (let i in this.players) {
            if (this.players[i].hasLeft) {
                delete this.players[i];
                this.removedPlayers.push(+i);
                continue;
            }
            this.players[i].reset();
        }

        this.updateStatus("Starting a new game");
    }

    private selectNextNumber() {
        let n;

        do {
            n = Math.floor(Math.random() * 100) + 1;
        } while (this.used[n] !== undefined);

        this.used[n] = true;
        this.selectedNumbers.push(n);
    }

    private updateStatus(status : string) {
        this.status = "Active players: " + this.getActivePlayerCount() + " - " + status;
    }
}