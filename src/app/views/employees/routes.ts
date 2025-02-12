import { Route } from "@angular/router";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";

export const EMPLOYEE_ROUTES: Route[] = [
    { path: '', loadComponent: () => import('./employees.component').then((mod)=> mod.EmployeesComponent) },
    { path: 'employees/add', component: AddEmployeeComponent },
]