import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Employee } from "../shared/Employee";
import {EmployeeService} from "../shared/employee.service";

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit{
  @Input()
  employee: Employee;

  araj: string;

  employees: Employee[];

  constructor(private service: EmployeeService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.service.getEmployee(+params['id']))
      .subscribe(empl => this.employee = empl)
  }
}
