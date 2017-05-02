import { TestBed, async } from '@angular/core/testing';

import { BingoCardService } from './card.service';
import { BingoGameStateService } from '../gameState/gameState.service';

let numberChecker = (numbers) => {
    expect(numbers.length).toBe(25);

    let bucket = {};

    for (let i = 0; i < numbers.length; i++) {
        if (bucket[numbers[i]] !== undefined) {
            fail("Found duplicate entry with number " + numbers[i]);
        }
        bucket[numbers[i]] = true;
    }
}

let isSameGrid = (numbers1, numbers2) => {
    let pos = 0;
    for (let i = 0; i < numbers1.length; i++) {
        if (numbers1[i] === numbers2[i]) {
            pos++;
        }
    }

    if (pos >= 24) {
        return true;
    }

    return false;
}

describe('BingoCardService', () => {
    let gameCard: BingoCardService;
    let gameState: BingoGameStateService;

    beforeEach(() => {
        gameState = new BingoGameStateService();
        gameState.addPlayer();
        gameCard = gameState.players[0];
    });

    it("Should mark players as inactive until a new game start", () => {
        expect(gameCard.isActive).toBe(false);
        expect(gameCard.isReady).toBe(false);
        expect(gameCard.hasLeft).toBe(false);

        gameCard.reset(); // Player has not been marked active yet
        expect(gameCard.isActive).toBe(false);
        expect(gameCard.isReady).toBe(false);
        expect(gameCard.hasLeft).toBe(false);

        gameCard.markReady(); // Let's mark the player to be ready
        expect(gameCard.isActive).toBe(false);
        expect(gameCard.isReady).toBe(true);
        expect(gameCard.hasLeft).toBe(false);

        gameCard.reset(); // Player has been marked active
        expect(gameCard.isActive).toBe(true);
        expect(gameCard.isReady).toBe(true);
        expect(gameCard.hasLeft).toBe(false);

        gameCard.markInactive(); // Let's mark the player inactive
        expect(gameCard.isActive).toBe(false);
        expect(gameCard.isReady).toBe(false);
        expect(gameCard.hasLeft).toBe(false);

        gameCard.reset(); // Player has been marked inactive, so they shouldn't play
        expect(gameCard.isActive).toBe(false);
        expect(gameCard.isReady).toBe(false);
        expect(gameCard.hasLeft).toBe(false);
    });

    it("Should not allow leaving active players to mark themself ready", () => {
        gameCard.markReady(); // Let's mark the player to be ready
        expect(gameCard.isActive).toBe(false);
        expect(gameCard.isReady).toBe(true);
        expect(gameCard.hasLeft).toBe(false);

        gameCard.markLeaving();
        expect(gameCard.isActive).toBe(false);
        expect(gameCard.isReady).toBe(false);
        expect(gameCard.hasLeft).toBe(true);

        gameCard.markReady(); // Let's mark the player to be ready, when the player has already left
        expect(gameCard.isActive).toBe(false);
        expect(gameCard.isReady).toBe(false);
        expect(gameCard.hasLeft).toBe(true);
    });

    it("Should not allow leaving inactive players to mark themself ready", () => {
        gameCard.markReady(); // Let's mark the player to be ready
        expect(gameCard.isActive).toBe(false);
        expect(gameCard.isReady).toBe(true);
        expect(gameCard.hasLeft).toBe(false);

        gameCard.markInactive(); // Let's mark the player to be ready
        expect(gameCard.isActive).toBe(false);
        expect(gameCard.isReady).toBe(false);
        expect(gameCard.hasLeft).toBe(false);

        gameCard.markLeaving();
        expect(gameCard.isActive).toBe(false);
        expect(gameCard.isReady).toBe(false);
        expect(gameCard.hasLeft).toBe(true);

        gameCard.markReady(); // Let's mark the player to be ready, when the player has already left
        expect(gameCard.isActive).toBe(false);
        expect(gameCard.isReady).toBe(false);
        expect(gameCard.hasLeft).toBe(true);
    });

    it("Should not allow leaving players that have never participated to mark themself ready", () => {
        gameCard.markReady(); // Let's mark the player to be ready
        expect(gameCard.isActive).toBe(false);
        expect(gameCard.isReady).toBe(true);
        expect(gameCard.hasLeft).toBe(false);

        gameCard.markInactive(); // Let's mark the player to be ready
        expect(gameCard.isActive).toBe(false);
        expect(gameCard.isReady).toBe(false);
        expect(gameCard.hasLeft).toBe(false);

        gameCard.markLeaving();
        expect(gameCard.isActive).toBe(false);
        expect(gameCard.isReady).toBe(false);
        expect(gameCard.hasLeft).toBe(true);

        gameCard.markReady(); // Let's mark the player to be ready, when the player has already left
        expect(gameCard.isActive).toBe(false);
        expect(gameCard.isReady).toBe(false);
        expect(gameCard.hasLeft).toBe(true);
    });

    it("Should generate numbers when an object has been created", () => {
        numberChecker(gameCard.luckyNumbers);
    });

    it("Should generate numbers when the card gets reset", () => {
        numberChecker(gameCard.luckyNumbers);
        let copy1 = gameCard.luckyNumbers.slice();

        gameCard.reset();
        numberChecker(gameCard.luckyNumbers);
        let copy2 = gameCard.luckyNumbers.slice();

        if (isSameGrid(copy1, copy2)) {
            fail("Too many similar numbers after card being reset");
        }
    });

    it("Should generate a new card when a player is ready and a new game has been started", () => {
        let copy1 = gameCard.luckyNumbers.slice();
        gameCard.markReady();
        gameCard.reset();

        let copy2 = gameCard.luckyNumbers.slice();

        if (isSameGrid(copy1, copy2)) {
            fail("Too many similar numbers after card being reset");
        }
    });

    it("Should check if the correct number is retrieved from the grid with getNumberAt", () => {
        expect(gameCard.getNumberAt(0, 0)).toBe(gameCard.luckyNumbers[0]);
        expect(gameCard.getNumberAt(0, 1)).toBe(gameCard.luckyNumbers[1]);
        expect(gameCard.getNumberAt(0, 2)).toBe(gameCard.luckyNumbers[2]);
        expect(gameCard.getNumberAt(0, 3)).toBe(gameCard.luckyNumbers[3]);
        expect(gameCard.getNumberAt(0, 4)).toBe(gameCard.luckyNumbers[4]);
        expect(gameCard.getNumberAt(1, 0)).toBe(gameCard.luckyNumbers[5]);
        expect(gameCard.getNumberAt(1, 1)).toBe(gameCard.luckyNumbers[6]);
        expect(gameCard.getNumberAt(1, 2)).toBe(gameCard.luckyNumbers[7]);
        expect(gameCard.getNumberAt(1, 3)).toBe(gameCard.luckyNumbers[8]);
        expect(gameCard.getNumberAt(1, 4)).toBe(gameCard.luckyNumbers[9]);
        expect(gameCard.getNumberAt(2, 0)).toBe(gameCard.luckyNumbers[10]);
        expect(gameCard.getNumberAt(2, 1)).toBe(gameCard.luckyNumbers[11]);
        expect(gameCard.getNumberAt(2, 2)).toBe(gameCard.luckyNumbers[12]);
        expect(gameCard.getNumberAt(2, 3)).toBe(gameCard.luckyNumbers[13]);
        expect(gameCard.getNumberAt(2, 4)).toBe(gameCard.luckyNumbers[14]);
        expect(gameCard.getNumberAt(3, 0)).toBe(gameCard.luckyNumbers[15]);
        expect(gameCard.getNumberAt(3, 1)).toBe(gameCard.luckyNumbers[16]);
        expect(gameCard.getNumberAt(3, 2)).toBe(gameCard.luckyNumbers[17]);
        expect(gameCard.getNumberAt(3, 3)).toBe(gameCard.luckyNumbers[18]);
        expect(gameCard.getNumberAt(3, 4)).toBe(gameCard.luckyNumbers[19]);
        expect(gameCard.getNumberAt(4, 0)).toBe(gameCard.luckyNumbers[20]);
        expect(gameCard.getNumberAt(4, 1)).toBe(gameCard.luckyNumbers[21]);
        expect(gameCard.getNumberAt(4, 2)).toBe(gameCard.luckyNumbers[22]);
        expect(gameCard.getNumberAt(4, 3)).toBe(gameCard.luckyNumbers[23]);
        expect(gameCard.getNumberAt(4, 4)).toBe(gameCard.luckyNumbers[24]);
    });

    it("Should check for bingo matches on horizontal lines", () => {
        // Make sure the card is active
        gameCard.markReady();
        gameCard.reset();
        expect(gameCard.isActive).toBe(true);

        expect(gameCard.isBingo([])).toBe(false);

        for (let i = 0; i < 5; i++) {
            expect(gameCard.isBingo([
                gameCard.getNumberAt(i, 0),
                gameCard.getNumberAt(i, 1),
                gameCard.getNumberAt(i, 2),
                gameCard.getNumberAt(i, 3),
                gameCard.getNumberAt(i, 4),
            ])).toBe(true);
            expect(gameCard.isBingo([
                gameCard.getNumberAt(i, 4),
                gameCard.getNumberAt(i, 3),
                gameCard.getNumberAt(i, 2),
                gameCard.getNumberAt(i, 1),
                gameCard.getNumberAt(i, 0),
            ])).toBe(true);
            expect(gameCard.isBingo([
                gameCard.getNumberAt(i, 4),
                gameCard.getNumberAt(i, 2),
                gameCard.getNumberAt(i, 1),
                gameCard.getNumberAt(i, 0),
                gameCard.getNumberAt(i, 3),
            ])).toBe(true);

            expect(gameCard.isBingo([
                gameCard.getNumberAt(i, 4),
                gameCard.getNumberAt(i, 2),
                gameCard.getNumberAt(i, 1),
                gameCard.getNumberAt(i, 0),
                gameCard.getNumberAt(i, 3) + 100, // Put number out of bounce, because its possible
            ])).toBe(false);
            expect(gameCard.isBingo([
                gameCard.getNumberAt(i, 4),
                gameCard.getNumberAt(i, 1),
                gameCard.getNumberAt(i, 0),
                gameCard.getNumberAt(i, 3),
            ])).toBe(false); // 1 number missing
        }
    });

    it("Should check for bingo matches on diagonal lines", () => {
        // Make sure the card is active
        gameCard.markReady();
        gameCard.reset();
        expect(gameCard.isActive).toBe(true);

        expect(gameCard.isBingo([])).toBe(false);

        expect(gameCard.isBingo([
            gameCard.getNumberAt(0, 0),
            gameCard.getNumberAt(1, 1),
            gameCard.getNumberAt(2, 2),
            gameCard.getNumberAt(3, 3),
            gameCard.getNumberAt(4, 4),
        ])).toBe(true);
        expect(gameCard.isBingo([
            gameCard.getNumberAt(4, 4),
            gameCard.getNumberAt(3, 3),
            gameCard.getNumberAt(2, 2),
            gameCard.getNumberAt(1, 1),
            gameCard.getNumberAt(0, 0),
        ])).toBe(true);
        expect(gameCard.isBingo([
            gameCard.getNumberAt(4, 4),
            gameCard.getNumberAt(2, 2),
            gameCard.getNumberAt(1, 1),
            gameCard.getNumberAt(0, 0),
            gameCard.getNumberAt(3, 3),
        ])).toBe(true);

        expect(gameCard.isBingo([
            gameCard.getNumberAt(4, 4),
            gameCard.getNumberAt(2, 2),
            gameCard.getNumberAt(1, 1),
            gameCard.getNumberAt(0, 0),
            gameCard.getNumberAt(3, 3) + 100, // Put number out of bounce, because its possible
        ])).toBe(false);


        expect(gameCard.isBingo([
            gameCard.getNumberAt(4, 0),
            gameCard.getNumberAt(1, 3),
            gameCard.getNumberAt(0, 4),
            gameCard.getNumberAt(3, 1),
        ])).toBe(false); // 1 number missing

        expect(gameCard.isBingo([
            gameCard.getNumberAt(0, 4),
            gameCard.getNumberAt(1, 3),
            gameCard.getNumberAt(2, 2),
            gameCard.getNumberAt(3, 1),
            gameCard.getNumberAt(4, 0),
        ])).toBe(true);
        expect(gameCard.isBingo([
            gameCard.getNumberAt(4, 0),
            gameCard.getNumberAt(3, 1),
            gameCard.getNumberAt(2, 2),
            gameCard.getNumberAt(1, 3),
            gameCard.getNumberAt(0, 4),
        ])).toBe(true);
        expect(gameCard.isBingo([
            gameCard.getNumberAt(4, 0),
            gameCard.getNumberAt(2, 2),
            gameCard.getNumberAt(1, 3),
            gameCard.getNumberAt(0, 4),
            gameCard.getNumberAt(3, 1),
        ])).toBe(true);

        expect(gameCard.isBingo([
            gameCard.getNumberAt(4, 0),
            gameCard.getNumberAt(2, 2),
            gameCard.getNumberAt(1, 3),
            gameCard.getNumberAt(0, 4),
            gameCard.getNumberAt(3, 1) + 100, // Put number out of bounce, because its possible
        ])).toBe(false);
        expect(gameCard.isBingo([
            gameCard.getNumberAt(4, 0),
            gameCard.getNumberAt(1, 3),
            gameCard.getNumberAt(0, 4),
            gameCard.getNumberAt(3, 1),
        ])).toBe(false); // 1 number missing
    });

    it("Should check for bingo matches on vertical lines", () => {
        // Make sure the card is active
        gameCard.markReady();
        gameCard.reset();
        expect(gameCard.isActive).toBe(true);

        expect(gameCard.isBingo([])).toBe(false);

        for (let i = 0; i < 5; i++) {
            expect(gameCard.isBingo([
                gameCard.getNumberAt(0, i),
                gameCard.getNumberAt(1, i),
                gameCard.getNumberAt(2, i),
                gameCard.getNumberAt(3, i),
                gameCard.getNumberAt(4, i),
            ])).toBe(true);
            expect(gameCard.isBingo([
                gameCard.getNumberAt(4, i),
                gameCard.getNumberAt(3, i),
                gameCard.getNumberAt(2, i),
                gameCard.getNumberAt(1, i),
                gameCard.getNumberAt(0, i),
            ])).toBe(true);
            expect(gameCard.isBingo([
                gameCard.getNumberAt(4, i),
                gameCard.getNumberAt(2, i),
                gameCard.getNumberAt(1, i),
                gameCard.getNumberAt(0, i),
                gameCard.getNumberAt(3, i),
            ])).toBe(true);

            expect(gameCard.isBingo([
                gameCard.getNumberAt(4, i),
                gameCard.getNumberAt(2, i),
                gameCard.getNumberAt(1, i),
                gameCard.getNumberAt(0, i),
                gameCard.getNumberAt(3, i) + 100, // Put number out of bounce, because its possible
            ])).toBe(false);
            expect(gameCard.isBingo([
                gameCard.getNumberAt(4, i),
                gameCard.getNumberAt(1, i),
                gameCard.getNumberAt(0, i),
                gameCard.getNumberAt(3, i),
            ])).toBe(false); // 1 number missing
        }
    });
});