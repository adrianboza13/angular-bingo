import { Injectable } from '@angular/core';

import { BingoGameStateService } from '../gameState/gameState.service';

@Injectable()
export class BingoCardService {
    luckyNumbers = [];
    isActive = false;
    isReady = false;
    hasWon = false;
    hasLeft = false;

    constructor(private gameState: BingoGameStateService) {
        this.generateCard();
    }

    getNumberAt(x: number, y: number) {
        if (x > 4 || x < 0)
            throw new Error("X is " + x + " and is not within range of 0 and 4");
        if (y > 4 || y < 0)
            throw new Error("Y is " + y + " and is not within range of 0 and 4");

        return this.luckyNumbers[x * 5 + y];
    }

    isBingo(numbers: number[]) {
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
    }

    markInactive() {
        this.isActive = false;
        this.isReady = false;
    }

    markLeaving() {
        this.markInactive();
        this.hasLeft = true;
    }

    markReady() {
        if (this.hasLeft) {
            return;
        }

        this.isReady = true;
    }

    reset() {
        if (this.isReady) {
            this.isActive = true;
        }

        this.generateCard();
    }

    private generateCard() {
        let used = {};
        this.luckyNumbers = [];

        for (let i = 0; i < 25; i++) {
            let n;
            do {
                n = Math.floor(Math.random() * 100) + 1;
            } while (used[n] !== undefined);

            this.luckyNumbers.push(n);
            used[n] = true;
        }
    }

    private checkHorizontal(pos: number, numbers: number[]) {
        let i = 0;
        for (;i < 5; i++) {
            if (numbers.indexOf(this.getNumberAt(pos, i)) === -1) {
                break;
            }
        }

        return i === 5;
    }

    private checkDiagonal(leftTop: boolean, numbers) {
        let i = 0;
        for (;i < 5; i++) {
            if (numbers.indexOf(this.getNumberAt(
                leftTop ? i : 4 - i, i
            )) === -1) {
                break;
            }
        }

        return i === 5;
    }

    private checkVertical(pos: number, numbers) {
        let i = 0;
        for (;i < 5; i++) {
            if (numbers.indexOf(this.getNumberAt(i, pos)) === -1) {
                break;
            }
        }

        return i === 5;
    }
}