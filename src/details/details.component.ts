import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Employee } from "../shared/Employee";
import {EmployeeService} from "../shared/employee.service";

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'my-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit{
  @Input()
  employee: Employee;

  constructor(
    private service: EmployeeService,
    private route: ActivatedRoute,
    private location: Location ){}

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.service.getList()
    .subscribe(list => this.employee = list.find(empl => empl.id === id));
  }

  back(){
      this.location.back();
  }

}
