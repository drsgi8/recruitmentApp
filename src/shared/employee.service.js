"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require("rxjs/Observable");
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/toPromise');
var EmployeeService = (function () {
    function EmployeeService(http) {
        this.http = http;
    }
    EmployeeService.prototype.getList = function () {
        return this.http.get('../assets/sluzba.json')
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EmployeeService.prototype.handleError = function (error) {
        var errStr;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var errTemp = body.error || JSON.stringify(body);
            errStr = error.status + ": " + (error.statusText || '') + " // " + errTemp;
        }
        else {
            errStr = error.message ? error.message : error.toString();
        }
        console.error(errStr);
        return Observable_1.Observable.throw(errStr);
    };
    EmployeeService = __decorate([
        core_1.Injectable()
    ], EmployeeService);
    return EmployeeService;
}());
exports.EmployeeService = EmployeeService;
