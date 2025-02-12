// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';

// export interface Employee {
//   id: number;
//   name: string;
//   department: string;
//   salary: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService {

//   private employees: Employee[] = [
//     { id: 1, name: 'John Doe', department: 'Engineering', salary: 60000 },
//     { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 55000 },
//     { id: 3, name: 'Tom Johnson', department: 'Sales', salary: 50000 },
//     { id: 4, name: 'Emily Davis', department: 'Human Resources', salary: 48000 },
//     { id: 5, name: 'Chris Lee', department: 'Engineering', salary: 70000 },
//     { id: 6, name: 'Sarah Brown', department: 'Marketing', salary: 62000 },
//     { id: 7, name: 'Daniel Wilson', department: 'Engineering', salary: 80000 },
//     { id: 8, name: 'Nancy Green', department: 'Sales', salary: 52000 }
//   ];

//   constructor() { }

//   getEmployees(): Observable<Employee[]> {
//     return of(this.employees); // Return the dummy data as an observable
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Public API

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, employee);
  }

  updateEmployee(employee: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${employee.id}`, employee);
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${employeeId}`);
  }

}
