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
var GlobalStorage = (function () {
    function GlobalStorage() {
        if (typeof global === "object") {
            if (typeof global["globalStorage"] !== "object") {
                global["globalStorage"] = {};
            }
            this.storage = global["globalStorage"];
        }
        else if (typeof window === "object") {
            if (typeof window["globalStorage"] !== "object") {
                window["globalStorage"] = {};
            }
            this.storage = window["globalStorage"];
        }
        else {
            throw new Error("No storage device found");
        }
    }
    GlobalStorage.prototype.keyGenerator = function () {
        return Math.floor(Math.random() * Math.pow(2, 32));
    };
    GlobalStorage.prototype.getNewGlob = function () {
        var number;
        do {
            number = this.keyGenerator();
        } while (typeof this.storage[number] === "object");
        this.storage[number] = {};
        return number;
    };
    GlobalStorage.prototype.store = function (glob, key, value) {
        if (typeof this.storage[glob] !== "object") {
            throw new Error("Invalid glob");
        }
        this.storage[glob][key] = value;
    };
    GlobalStorage.prototype.fetch = function (glob, key) {
        if (typeof this.storage[glob] !== "object") {
            return;
        }
        return this.storage[glob][key];
    };
    GlobalStorage.prototype.reset = function () {
        this.storage = {};
    };
    return GlobalStorage;
}());
GlobalStorage = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], GlobalStorage);
export { GlobalStorage };
//# sourceMappingURL=globalStorage.service.js.map