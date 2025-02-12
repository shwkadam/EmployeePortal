import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HighlightDirective } from '../../shared/highlight.directive';
import { RemovePrefixPipe } from '../../shared/remove-prefix.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HighlightDirective, RemovePrefixPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  employees: any[] = [];

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeService.getEmployees()
        .subscribe((employee: any[]) => this.employees = employee.slice(3, 7));
  }
}
