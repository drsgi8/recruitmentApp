"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/switchMap');
var DetailsComponent = (function () {
    function DetailsComponent(service, route, location) {
        this.service = service;
        this.route = route;
        this.location = location;
    }
    DetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = +this.route.snapshot.params['id'];
        this.service.getList()
            .subscribe(function (list) { return _this.employee = list.find(function (empl) { return empl.id === id; }); });
    };
    DetailsComponent.prototype.back = function () {
        this.location.back();
    };
    DetailsComponent = __decorate([
        core_1.Component({
            selector: 'my-details',
            templateUrl: './details.component.html',
        })
    ], DetailsComponent);
    return DetailsComponent;
}());
exports.DetailsComponent = DetailsComponent;
