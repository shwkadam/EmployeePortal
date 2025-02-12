import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'employees', loadChildren: () => import('./views/employees/routes').then((mod) => mod.EMPLOYEE_ROUTES)},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
