import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MyDatePickerModule } from 'mydatepicker';

import { AppComponent } from './app.component';
import { EmployeeService } from "../shared/employee.service";
import { ListComponent } from "../list/list.component";
import { RoutingModule } from "../shared/routing.module";

@NgModule({
  declarations: [
    AppComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    MyDatePickerModule
  ],
  providers: [ EmployeeService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
