import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import { Employee } from "../shared/Employee";
import { EmployeeService } from "../shared/employee.service";
import {IMyDateModel, IMyOptions} from "mydatepicker";

const RECORDS_ON_PAGE: number = 5;
//CLOSE DROPDOWN LISTS ON CLICK
document.onclick = (event)=>{
  if(!event.toElement.matches(".dropButton")) {
    let sortList = document.getElementById("dropdown");
    if (sortList.classList.contains("show"))
      sortList.classList.remove("show");
    let filterList = document.getElementById("filterDropdown");
    if (filterList.classList.contains("show"))
      filterList.classList.remove("show");
  }
};

@Component({
  selector: 'my-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.bar.css', './list.component.table.css']
})

export class ListComponent implements OnInit {

  //pagination
  currentPage: number = 1;
  numberOfPages: number = 3;
  //sort/filter
  sortBy: string = null;
  filterBy: string = null;
  filterString: string = null;
  filterDate: string = null;
  //lists
  employees: Employee[];
  employeesDisplayed: Employee[];
  employeesOnPage: Employee[];
  //set date format
  private datePickerOptions: IMyOptions = {
    dateFormat: 'dd.mm.yyyy'
  };
  // Initialized to specific date
  private dateModel: Object = { date: { year: 1986, month: 1, day: 3 }};

  constructor(private service: EmployeeService,
              private router: Router,
              private route: ActivatedRoute) {}

  ////FILTERING////
  filter(): void {
    switch (this.filterBy){
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
  }
  filterByNone(): void {
    //clear applied filters
    this.filterBy = null;
    this.filterDate = null;
    this.filterString = null;
    //reset lists
    this.employeesDisplayed =this.employees;
    this.numberOfPages = Math.ceil(this.employeesDisplayed.length / RECORDS_ON_PAGE);
    this.employeesOnPage = this.employeesDisplayed.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
  }
  customFilterByDate(): void {
    this.filterBy = "DATE";
    this.filterString = null;
    if(this.dateModel == null) return;
    this.employeesDisplayed = this.employees.filter(a => this.compareDates(a.dateOfBirth));
    this.numberOfPages = Math.ceil(this.employeesDisplayed.length / RECORDS_ON_PAGE);
    this.currentPage = 1;
    this.router.navigate(['/list', 1]);
    this.employeesOnPage = this.employeesDisplayed.slice(0,RECORDS_ON_PAGE);
  }
  compareDates(a:string): boolean {
    //get date from date-time string
    let date = a.split(' ')[0];
    //separate day, month and year into separate strings in array
    let dateArr = date.split('.');
    //check if days, months and years are equal
    if(+dateArr[0] != this.dateModel['date'].day) return false;
    if(+dateArr[1] != this.dateModel['date'].month) return false;
    if(+dateArr[2] != this.dateModel['date'].year) return false;
    return true;
  }
  filterById(): void {
    //set filtering methd
    if(this.filterBy != "ID")
    this.filterBy = "ID";
    //if user didn't wrote any string to filter by, return
    if(this.filterString == null) return;
    //filter main list
    this.employeesDisplayed = this.employees.filter(a => a.id == +(this.filterString));
    //check how many pages will filtered list have
    this.numberOfPages = Math.ceil(this.employeesDisplayed.length / RECORDS_ON_PAGE);
    //go to first page
    this.currentPage = 1;
    this.router.navigate(['/list', 1]);
    //show only wanted number of records
    this.employeesOnPage = this.employeesDisplayed.slice(0,RECORDS_ON_PAGE);
  }
  filterByName(): void {
    if(this.filterBy != "NAME")
      this.filterBy = "NAME";
    if(this.filterString == null) return;
    this.employeesDisplayed = this.employees.filter(a => a.firstName.toLowerCase().includes(this.filterString.toLowerCase()));
    this.numberOfPages = Math.ceil(this.employeesDisplayed.length / RECORDS_ON_PAGE);
    this.currentPage = 1;
    this.router.navigate(['/list', 1]);
    this.employeesOnPage = this.employeesDisplayed.slice(0,RECORDS_ON_PAGE);
  }
  filterByLastName(): void {
    if(this.filterBy != "LAST NAME")
      this.filterBy = "LAST NAME";
    if(this.filterString == null) return;
    this.employeesDisplayed = this.employees.filter(a => a.lastName.toLowerCase().includes(this.filterString.toLowerCase()));
    this.numberOfPages = Math.ceil(this.employeesDisplayed.length / RECORDS_ON_PAGE);
    this.currentPage = 1;
    this.router.navigate(['/list', 1]);
    this.employeesOnPage = this.employeesDisplayed.slice(0,RECORDS_ON_PAGE);
  }
  filterByFunction(): void {
    if(this.filterBy != "FUNCTION")
      this.filterBy = "FUNCTION";
    if(this.filterString == null) return;
    this.employeesDisplayed = this.employees.filter(a => a.function.toLowerCase().includes(this.filterString.toLowerCase()));
    this.numberOfPages = Math.ceil(this.employeesDisplayed.length / RECORDS_ON_PAGE);
    this.currentPage = 1;
    this.router.navigate(['/list', 1]);
    this.employeesOnPage = this.employeesDisplayed.slice(0,RECORDS_ON_PAGE);
  }
  filterByExperience(): void {
    if(this.filterBy != "EXPERIENCE")
      this.filterBy = "EXPERIENCE";
    if(this.filterString == null) return;
    this.employeesDisplayed = this.employees.filter(a => a.experience == +(this.filterString));
    this.numberOfPages = Math.ceil(this.employeesDisplayed.length / RECORDS_ON_PAGE);
    this.currentPage = 1;
    this.router.navigate(['/list', 1]);
    this.employeesOnPage = this.employeesDisplayed.slice(0,RECORDS_ON_PAGE);
  }
  onDateChanged(event: IMyDateModel): void {
    this.dateModel = event;
    this.customFilterByDate();
  }
  ////SORTING////
  showDropdown(id: string): void{
   document.getElementById(id).classList.toggle("show");
  }
  sortById(): void{
    this.employees.sort((a, b) => a.id - b.id);
    this.employeesOnPage = this.employees.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
    this.sortBy = "ID";
  }
  sortByName(): void{
    this.employees.sort((a, b) => {
      if(a.firstName < b.firstName) return -1;
      else if(a.firstName > b.firstName) return 1;
      else return a.id - b.id;
    });
    this.employeesOnPage = this.employees.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
    this.sortBy = "NAME";
  }
  sortByLastName(): void{
    this.employees.sort((a, b) => {
      if(a.lastName < b.lastName) return -1;
      else if(a.lastName > b.lastName) return 1;
      else return a.id - b.id;
    });
    this.employeesOnPage = this.employees.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
    this.sortBy = "LAST NAME";
  }
  sortByBirthdate(): void {
    this.employees.sort((a, b) => this.sortDates(a.dateOfBirth, b.dateOfBirth));
    this.employeesOnPage = this.employees.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
    this.sortBy = "BIRTHDATE";
  }
  sortByFunction(): void{
    this.employees.sort((a, b) => {
      if(a.function < b.function) return -1;
      else if(a.function > b.function) return 1;
      else return a.id - b.id;
    });
    this.employeesOnPage = this.employees.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
    this.sortBy = "FUNCTION";
  }
  sortByExperience(): void{
    this.employees.sort((a, b) => a.experience - b.experience);
    this.employeesOnPage = this.employees.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
    this.sortBy = "EXPERIENCE";
  }
  sortDates(a:string, b:string): number {
    //separate date from time then separate days, months and years
    // into separate array objects eg. '01.03.1993' => ['01','03','1993']
    let dateA = a.split(' ')[0].split('.');
    let dateB = b.split(' ')[0].split('.');
    //check if yearA is less than yearB if they're equal go to months etc...
    for(let i=2; i>=0; i--){
     if((+dateA[i]) - (+dateB[i]) != 0)
       return (+dateA[i]) - (+dateB[i]);
    }
    return 0;
  }
  ////REUTER NAVIGATION////
  showDetails(empl: Employee): void{
    this.router.navigate(['/details', empl.id]);
  }
  pageUp(): void{
    if(this.currentPage < this.numberOfPages) {
      this.router.navigate(['/list', ++this.currentPage]);
      this.employeesOnPage = this.employeesDisplayed.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
    }
  }
  pageDown(): void{
    if(this.currentPage > 1) {
      this.router.navigate(['/list', --this.currentPage]);
      this.employeesOnPage = this.employeesDisplayed.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
    }
  }
  goTo(page: number): void{
    this.router.navigate(['/list',page]);
    this.currentPage = page;
    this.employeesOnPage = this.employeesDisplayed.slice((this.currentPage - 1) * RECORDS_ON_PAGE, this.currentPage * RECORDS_ON_PAGE);
  }
  //onInit
  ngOnInit(): void {
    this.currentPage = +this.route.snapshot.params['page'];
    this.service.getList()
      .subscribe(list => {
        this.employeesDisplayed = list;
        this.employeesOnPage = this.employeesDisplayed.slice((this.currentPage-1)*RECORDS_ON_PAGE, this.currentPage*RECORDS_ON_PAGE);
        this.numberOfPages = Math.ceil(list.length / RECORDS_ON_PAGE);
        return this.employees = list;
      });

  }
}
