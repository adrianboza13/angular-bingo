var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { BingoCardService } from '../card/card.service';
var BingoGameStateService = (function () {
    function BingoGameStateService() {
        this.selectedNumbers = [];
        this.used = {};
        this.players = [];
        this.status = "Game is loading...";
        this.winner = undefined;
        this.removedPlayers = [];
        this.updateStatus("Press reset to start a new game");
        this.winner = -1;
    }
    BingoGameStateService.prototype.addPlayer = function () {
        this.players.push(new BingoCardService(this));
    };
    BingoGameStateService.prototype.removePlayer = function (id) {
        if (this.players[id] === undefined) {
            throw new Error("Invalid players");
        }
        this.players[id].markLeaving();
    };
    BingoGameStateService.prototype.markPlayerReady = function (id) {
        if (this.players[id] === undefined) {
            throw new Error("Invalid players");
        }
        this.players[id].markReady();
    };
    BingoGameStateService.prototype.markPlayerInactive = function (id) {
        if (this.players[id] === undefined) {
            throw new Error("Invalid players");
        }
        this.players[id].markInactive();
    };
    BingoGameStateService.prototype.getPlayerCount = function () {
        var count = 0;
        for (var i in this.players) {
            if (this.players[i] !== undefined) {
                count++;
            }
        }
        return count;
    };
    BingoGameStateService.prototype.getActivePlayerCount = function () {
        var count = 0;
        for (var i in this.players) {
            if (this.players[i].isActive) {
                count++;
            }
        }
        return count;
    };
    BingoGameStateService.prototype.next = function () {
        if (this.winner !== undefined) {
            this.updateStatus([
                "Please press the reset button to start a new game",
                "This game has ended, please press the reset button to start a new game",
                "There is no next number in this game as the game has been ended, press the reset button to start a new game"
            ][Math.floor(Math.random() * 3)]);
            return;
        }
        if (this.selectedNumbers.length < 100) {
            this.selectNextNumber();
            this.updateStatus("Number " + this.selectedNumbers[this.selectedNumbers.length - 1] +
                " got selected as number " + this.selectedNumbers.length);
        }
        else {
            this.updateStatus("There are no numbers left to be selected");
        }
        for (var i in this.players) {
            if (this.players[i].isBingo(this.selectedNumbers)) {
                this.winner = true;
                this.status = "We have a winner";
                return;
            }
        }
    };
    BingoGameStateService.prototype.reset = function () {
        this.winner = undefined;
        this.used = {};
        this.selectedNumbers = [];
        for (var i in this.players) {
            if (this.players[i].hasLeft) {
                delete this.players[i];
                this.removedPlayers.push(+i);
                continue;
            }
            this.players[i].reset();
        }
        this.updateStatus("Starting a new game");
    };
    BingoGameStateService.prototype.selectNextNumber = function () {
        var n;
        do {
            n = Math.floor(Math.random() * 100) + 1;
        } while (this.used[n] !== undefined);
        this.used[n] = true;
        this.selectedNumbers.push(n);
    };
    BingoGameStateService.prototype.updateStatus = function (status) {
        this.status = "Active players: " + this.getActivePlayerCount() + " - " + status;
    };
    return BingoGameStateService;
}());
BingoGameStateService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], BingoGameStateService);
export { BingoGameStateService };
//# sourceMappingURL=gameState.service.js.map