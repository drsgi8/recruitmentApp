"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var RECORDS_ON_PAGE = 5;
//CLOSE DROPDOWN LISTS ON CLICK
window.onclick = function (event) {
    if (!event.toElement.matches(".dropButton")) {
        var sortList = document.getElementById("dropdown");
        if (sortList.classList.contains("show"))
            sortList.classList.remove("show");
        var filterList = document.getElementById("filterDropdown");
        if (filterList.classList.contains("show"))
            filterList.classList.remove("show");
    }
};
var ListComponent = (function () {
    function ListComponent(service, router, route) {
        this.service = service;
        this.router = router;
        this.route = route;
        //pagination
        this.currentPage = 1;
        this.numberOfPages = 3;
        //sort/filter
        this.sortBy = null;
        this.filterBy = null;
        this.filterByDate = false;
        this.filterString = null;
        this.filterDate = null;
    }
    ////FILTERING////
    ListComponent.prototype.filter = function () {
        switch (this.filterBy) {
            case "ID":
                this.filterById();
                break;
            case "NAME":
                this.filterByName();
                break;
            case "LAST NAME":
                this.filterByLastName();
                break;
            case "FUNCTION":
                this.filterByFunction();
                break;
            case "EXPERIENCE":
                this.filterByExperience();
                break;
        }
    };
    ListComponent.prototype.filterByNone = function () {
        //clear applied filters
        this.filterBy = null;
        this.filterByDate = false;
        this.filterDate = null;
        this.filterString = null;
        //reset lists
        this.employeesDisplayed = this.employees;
        this.numberOfPages = Math.ceil(this.employeesDisplayed.length / RECORDS_ON_PAGE);
        this.employeesOnPage = this.employeesDisplayed.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
    };
    ListComponent.prototype.customFilterByDate = function () {
        this.filterByDate = true;
        this.filterBy = null;
        this.filterString = null;
    };
    ListComponent.prototype.filterById = function () {
        var _this = this;
        //set filtering methd
        if (this.filterBy != "ID")
            this.filterBy = "ID";
        //if user didn't wrote any string to filter by, return
        if (this.filterString == null)
            return;
        //filter main list
        this.employeesDisplayed = this.employees.filter(function (a) { return a.id == +(_this.filterString); });
        //check how many pages will filtered list have
        this.numberOfPages = Math.ceil(this.employeesDisplayed.length / RECORDS_ON_PAGE);
        //go to first page
        this.currentPage = 1;
        this.router.navigate(['/list', 1]);
        //show only wanted number of records
        this.employeesOnPage = this.employeesDisplayed.slice(0, RECORDS_ON_PAGE);
    };
    ListComponent.prototype.filterByName = function () {
        var _this = this;
        if (this.filterBy != "NAME")
            this.filterBy = "NAME";
        if (this.filterString == null)
            return;
        this.employeesDisplayed = this.employees.filter(function (a) { return a.firstName.includes(_this.filterString); });
        this.numberOfPages = Math.ceil(this.employeesDisplayed.length / RECORDS_ON_PAGE);
        this.currentPage = 1;
        this.router.navigate(['/list', 1]);
        this.employeesOnPage = this.employeesDisplayed.slice(0, RECORDS_ON_PAGE);
    };
    ListComponent.prototype.filterByLastName = function () {
        var _this = this;
        if (this.filterBy != "LAST NAME")
            this.filterBy = "LAST NAME";
        if (this.filterString == null)
            return;
        this.employeesDisplayed = this.employees.filter(function (a) { return a.lastName.includes(_this.filterString); });
        this.numberOfPages = Math.ceil(this.employeesDisplayed.length / RECORDS_ON_PAGE);
        this.currentPage = 1;
        this.router.navigate(['/list', 1]);
        this.employeesOnPage = this.employeesDisplayed.slice(0, RECORDS_ON_PAGE);
    };
    ListComponent.prototype.filterByFunction = function () {
        var _this = this;
        if (this.filterBy != "FUNCTION")
            this.filterBy = "FUNCTION";
        if (this.filterString == null)
            return;
        this.employeesDisplayed = this.employees.filter(function (a) { return a.function.includes(_this.filterString); });
        this.numberOfPages = Math.ceil(this.employeesDisplayed.length / RECORDS_ON_PAGE);
        this.currentPage = 1;
        this.router.navigate(['/list', 1]);
        this.employeesOnPage = this.employeesDisplayed.slice(0, RECORDS_ON_PAGE);
    };
    ListComponent.prototype.filterByExperience = function () {
        var _this = this;
        if (this.filterBy != "EXPERIENCE")
            this.filterBy = "EXPERIENCE";
        if (this.filterString == null)
            return;
        this.employeesDisplayed = this.employees.filter(function (a) { return a.experience == +(_this.filterString); });
        this.numberOfPages = Math.ceil(this.employeesDisplayed.length / RECORDS_ON_PAGE);
        this.currentPage = 1;
        this.router.navigate(['/list', 1]);
        this.employeesOnPage = this.employeesDisplayed.slice(0, RECORDS_ON_PAGE);
    };
    ////SORTING////
    ListComponent.prototype.showDropdown = function (id) {
        document.getElementById(id).classList.toggle("show");
    };
    ListComponent.prototype.sortById = function () {
        this.employees.sort(function (a, b) { return a.id - b.id; });
        this.employeesOnPage = this.employees.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
        this.sortBy = "ID";
    };
    ListComponent.prototype.sortByName = function () {
        this.employees.sort(function (a, b) {
            if (a.firstName < b.firstName)
                return -1;
            else if (a.firstName > b.firstName)
                return 1;
            else
                return a.id - b.id;
        });
        this.employeesOnPage = this.employees.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
        this.sortBy = "NAME";
    };
    ListComponent.prototype.sortByLastName = function () {
        this.employees.sort(function (a, b) {
            if (a.lastName < b.lastName)
                return -1;
            else if (a.lastName > b.lastName)
                return 1;
            else
                return a.id - b.id;
        });
        this.employeesOnPage = this.employees.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
        this.sortBy = "LAST NAME";
    };
    ListComponent.prototype.sortByFunction = function () {
        this.employees.sort(function (a, b) {
            if (a.function < b.function)
                return -1;
            else if (a.function > b.function)
                return 1;
            else
                return a.id - b.id;
        });
        this.employeesOnPage = this.employees.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
        this.sortBy = "FUNCTION";
    };
    ListComponent.prototype.sortByExperience = function () {
        this.employees.sort(function (a, b) { return a.experience - b.experience; });
        this.employeesOnPage = this.employees.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
        this.sortBy = "EXPERIENCE";
    };
    ////REUTER NAVIGATION////
    ListComponent.prototype.showDetails = function (empl) {
        this.router.navigate(['/details', empl.id]);
    };
    ListComponent.prototype.pageUp = function () {
        if (this.currentPage < this.numberOfPages) {
            this.router.navigate(['/list', ++this.currentPage]);
            this.employeesOnPage = this.employeesDisplayed.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
        }
    };
    ListComponent.prototype.pageDown = function () {
        if (this.currentPage > 1) {
            this.router.navigate(['/list', --this.currentPage]);
            this.employeesOnPage = this.employeesDisplayed.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
        }
    };
    ListComponent.prototype.goTo = function (page) {
        this.router.navigate(['/list', page]);
        this.currentPage = page;
        this.employeesOnPage = this.employeesDisplayed.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
    };
    //onInit
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentPage = +this.route.snapshot.params['page'];
        this.service.getList()
            .subscribe(function (list) {
            _this.employeesDisplayed = list;
            _this.employeesOnPage = _this.employeesDisplayed.slice((_this.currentPage - 1) * RECORDS_ON_PAGE, _this.currentPage * RECORDS_ON_PAGE);
            _this.numberOfPages = Math.ceil(list.length / RECORDS_ON_PAGE);
            return _this.employees = list;
        });
    };
    ListComponent = __decorate([
        core_1.Component({
            selector: 'my-list',
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.bar.css', './list.component.table.css']
        })
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
