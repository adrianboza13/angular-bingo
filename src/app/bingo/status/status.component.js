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
var BingoStatusComponent = (function () {
    function BingoStatusComponent() {
    }
    BingoStatusComponent.prototype.ngOnInit = function () {
        var storage = new GlobalStorage();
        this.state = storage.fetch(this.glob, "game");
    };
    return BingoStatusComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Number)
], BingoStatusComponent.prototype, "glob", void 0);
BingoStatusComponent = __decorate([
    Component({
        selector: 'bingo-status',
        templateUrl: './status.component.html',
        styleUrls: ['./status.component.css']
    }),
    __metadata("design:paramtypes", [])
], BingoStatusComponent);
export { BingoStatusComponent };
//# sourceMappingURL=status.component.js.map