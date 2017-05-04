import { Injectable } from '@angular/core';

@Injectable()
export class GlobalStorage {
    private storage: object;

    constructor() {
        if (typeof global === "object") {
            if (typeof global["globalStorage"] !== "object") {
                global["globalStorage"] = {};
            }
            this.storage = global["globalStorage"];
        } else if (typeof window === "object") {
            if (typeof window["globalStorage"] !== "object") {
                window["globalStorage"] = {};
            }
            this.storage = window["globalStorage"];
        } else {
            throw new Error("No storage device found");
        }
    }

    private keyGenerator() {
        return Math.floor(Math.random() * 2 ** 32);
    }

    getNewGlob() {
        let number;

        do {
            number = this.keyGenerator();
        } while (typeof this.storage[number] === "object");

        this.storage[number] = {};

        return number;
    }

    store(glob: number, key: string, value: any) {
        if (typeof this.storage[glob] !== "object") {
            throw new Error("Invalid glob");
        }

        this.storage[glob][key] = value;
    }

    fetch(glob: number, key: string) {
        if (typeof this.storage[glob] !== "object") {
            return;
        }

        return this.storage[glob][key];
    }

    reset() {
        this.storage = {};
    }
}