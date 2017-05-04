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
import { BingoGameStateService } from '../gameState/gameState.service';
var BingoCardService = (function () {
    function BingoCardService(gameState) {
        this.gameState = gameState;
        this.luckyNumbers = [];
        this.isActive = false;
        this.isReady = false;
        this.hasWon = false;
        this.hasLeft = false;
        this.generateCard();
    }
    BingoCardService.prototype.getNumberAt = function (x, y) {
        if (x > 4 || x < 0)
            throw new Error("X is " + x + " and is not within range of 0 and 4");
        if (y > 4 || y < 0)
            throw new Error("Y is " + y + " and is not within range of 0 and 4");
        return this.luckyNumbers[x * 5 + y];
    };
    BingoCardService.prototype.isBingo = function (numbers) {
        if (!this.isActive) {
            return false;
        }
        return this.checkHorizontal(0, numbers) ||
            this.checkHorizontal(1, numbers) ||
            this.checkHorizontal(2, numbers) ||
            this.checkHorizontal(3, numbers) ||
            this.checkHorizontal(4, numbers) ||
            this.checkDiagonal(true, numbers) ||
            this.checkDiagonal(false, numbers) ||
            this.checkVertical(0, numbers) ||
            this.checkVertical(1, numbers) ||
            this.checkVertical(2, numbers) ||
            this.checkVertical(3, numbers) ||
            this.checkVertical(4, numbers);
    };
    BingoCardService.prototype.markInactive = function () {
        this.isActive = false;
        this.isReady = false;
    };
    BingoCardService.prototype.markLeaving = function () {
        this.markInactive();
        this.hasLeft = true;
    };
    BingoCardService.prototype.markReady = function () {
        if (this.hasLeft) {
            return;
        }
        this.isReady = true;
    };
    BingoCardService.prototype.reset = function () {
        if (this.isReady) {
            this.isActive = true;
        }
        this.generateCard();
    };
    BingoCardService.prototype.generateCard = function () {
        var used = {};
        this.luckyNumbers = [];
        for (var i = 0; i < 25; i++) {
            var n = void 0;
            do {
                n = Math.floor(Math.random() * 100) + 1;
            } while (used[n] !== undefined);
            this.luckyNumbers.push(n);
            used[n] = true;
        }
    };
    BingoCardService.prototype.checkHorizontal = function (pos, numbers) {
        var i = 0;
        for (; i < 5; i++) {
            if (numbers.indexOf(this.getNumberAt(pos, i)) === -1) {
                break;
            }
        }
        return i === 5;
    };
    BingoCardService.prototype.checkDiagonal = function (leftTop, numbers) {
        var i = 0;
        for (; i < 5; i++) {
            if (numbers.indexOf(this.getNumberAt(leftTop ? i : 4 - i, i)) === -1) {
                break;
            }
        }
        return i === 5;
    };
    BingoCardService.prototype.checkVertical = function (pos, numbers) {
        var i = 0;
        for (; i < 5; i++) {
            if (numbers.indexOf(this.getNumberAt(i, pos)) === -1) {
                break;
            }
        }
        return i === 5;
    };
    return BingoCardService;
}());
BingoCardService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [BingoGameStateService])
], BingoCardService);
export { BingoCardService };
//# sourceMappingURL=card.service.js.map