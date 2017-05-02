import { TestBed, async } from '@angular/core/testing';

import { BingoGameStateService } from './gameState.service';

describe('BingoGameStateService', () => {
    let gameState: BingoGameStateService;

    beforeEach(() => { gameState = new BingoGameStateService(); });

    it("Should start in the correct state", () => {
        expect(gameState.status).toBe("Active players: 0 - Press reset to start a new game");
        expect(gameState.selectedNumbers).toEqual([]);
        expect(gameState.used).toEqual({});
        expect(gameState.players).toEqual([]);
        expect(gameState.winner).toBe(-1);
    });

    it("Should show the correct amount of players after adding or removing players", () => {
        expect(gameState.getPlayerCount()).toBe(0);
        expect(gameState.removedPlayers).toEqual([]);

        gameState.addPlayer();
        expect(gameState.getPlayerCount()).toBe(1);
        expect(gameState.removedPlayers).toEqual([]);

        // Player left, but will only be removed after the game has ended
        gameState.removePlayer(0);
        expect(gameState.players[0].hasLeft).toBe(true);

        // The player that has left has been removed from the game
        gameState.reset();
        expect(gameState.players[0]).toBe(undefined);
        expect(gameState.getPlayerCount()).toBe(0);
        expect(gameState.removedPlayers).toEqual([0]);
    });

    it("Should be able to mark a player ready/inactive", () => {
        gameState.addPlayer();
        expect(gameState.players[0].isReady).toBe(false);
        expect(gameState.players[0].isActive).toBe(false);
        expect(gameState.getActivePlayerCount()).toBe(0);

        // Mark player active, but the player will only be active in the next game
        gameState.markPlayerReady(0);
        expect(gameState.players[0].isReady).toBe(true);
        expect(gameState.players[0].isActive).toBe(false);
        expect(gameState.getActivePlayerCount()).toBe(0);

        // Let's start the next game
        gameState.reset()
        expect(gameState.players[0].isReady).toBe(true);
        expect(gameState.players[0].isActive).toBe(true);
        expect(gameState.getActivePlayerCount()).toBe(1);

        // Mark player active, but the player will only be active in the next game
        gameState.markPlayerInactive(0);
        expect(gameState.players[0].isReady).toBe(false);
        expect(gameState.players[0].isActive).toBe(false);
        expect(gameState.getActivePlayerCount()).toBe(0);
    });

    it("Should show a warning when a game has not started yet", () => {
        let regExp = /the reset button to start a new game$/;

        // Message at start is slightly different
        expect(regExp.test(gameState.status)).toBe(false);

        // Spam the next button
        for (let i = 0; i < 20; i++) {
            gameState.next();
            expect(regExp.test(gameState.status)).toBe(true);
        }
    });

    it("Should be able to play a game", () => {
        gameState.addPlayer();
        gameState.markPlayerReady(0);
        gameState.reset();

        let count = 0;

        while (gameState.winner === undefined && count < 101) {
            gameState.next();
            count++;
        }

        if (count > 100) {
            fail("Game did not end");
        }

        expect(gameState.winner).toBe(true);
    });

    it("Should show a warning when a game has ended when pressing the next button", () => {
        let regExp = /the reset button to start a new game$/;

        // Message at start is slightly different
        expect(regExp.test(gameState.status)).toBe(false);

        gameState.addPlayer();
        gameState.markPlayerReady(0);
        gameState.reset();

        let count = 0;

        while (gameState.winner === undefined && count < 101) {
            // Should totally not match
            expect(regExp.test(gameState.status)).toBe(false);

            gameState.next();
            count++;
        }

        if (count > 100) {
            fail("Game did not end");
        }

        // Should totally not match
        expect(regExp.test(gameState.status)).toBe(false);

        // Spam the next button
        for (let i = 0; i < 20; i++) {
            gameState.next();
            expect(regExp.test(gameState.status)).toBe(true);
        }
    });
});