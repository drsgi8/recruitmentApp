import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { Employee } from "./Employee";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class EmployeeService{

  constructor(private http: Http){}

  getList(): Observable<Employee[]>{
    return this.http.get('../assets/sluzba.json')
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errStr: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const errTemp = body.error || JSON.stringify(body);
      errStr = `${error.status}: ${error.statusText || ''} // ${errTemp}`;
    } else {
      errStr = error.message ? error.message : error.toString();
    }
    console.error(errStr);
    return Observable.throw(errStr);
  }

}
