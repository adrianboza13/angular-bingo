var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { GlobalStorage } from '../../lib/globalStorage.service';
var BingoCardComponent = (function () {
    function BingoCardComponent() {
    }
    BingoCardComponent.prototype.ngOnInit = function () {
        var storage = new GlobalStorage();
        this.state = storage.fetch(this.glob, "game");
        this.card = this.state.players[this.cardId];
    };
    return BingoCardComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Number)
], BingoCardComponent.prototype, "cardId", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], BingoCardComponent.prototype, "glob", void 0);
BingoCardComponent = __decorate([
    Component({
        selector: 'bingo-card',
        templateUrl: './card.component.html',
        styleUrls: ['./card.component.css']
    }),
    __metadata("design:paramtypes", [])
], BingoCardComponent);
export { BingoCardComponent };
//# sourceMappingURL=card.component.js.map