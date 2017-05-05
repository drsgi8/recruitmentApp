import { Component, OnInit } from '@angular/core';

import { Employee } from "../shared/Employee";
import { EmployeeService } from "../shared/employee.service";
import { Router } from "@angular/router";

@Component({
  selector: 'my-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

  employees: Employee[];

  constructor(private service: EmployeeService, private router: Router) {}

  showDetails(empl: Employee): void{
    this.router.navigate(['/details', empl.id]);
  }


  ngOnInit(): void {
    this.service.getList()
      .then(empls => this.employees = empls);
  }
}
