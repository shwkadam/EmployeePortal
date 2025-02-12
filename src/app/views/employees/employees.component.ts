import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { AllCommunityModule, ColDef, ModuleRegistry, RowSelectionOptions, SelectionChangedEvent } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ActionsRendererModule } from './actions-renderer.module';
import { HttpClientModule } from '@angular/common/http';
import { ActionsRendererComponent } from './actions-renderer.component';
import { RouterLink } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    AgGridModule,
    FormsModule,
    CommonModule,
    ActionsRendererModule,
    HttpClientModule,
    RouterLink,
    AgGridAngular,
    AddEmployeeComponent
  ],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmployeesComponent {
  employees: any[] = [];

  columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name', filter: true },
    { headerName: 'Username', field: 'username' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Phone', field: 'phone' },
    // {
    //   headerName: 'Actions',
    //   cellRenderer: 'appActionsRenderer', // Custom cell renderer for actions
    //   maxWidth: 200,
    // },
  ];

  rowData: any[] = [];
  gridApi: any;
  gridColumnApi: any;
  public paginationPageSize = 6;
  public paginationPageSizeSelector: number[] | boolean = [6, 10, 20];
  showModal: boolean = false;
  // frameworkComponents: any = {
  //   appActionsRenderer: ActionsRendererComponent,
  // };
  gridOptions = {
    context: { componentParent: this },
    onGridReady: (params: any) => this.onGridReady(params),
  };
  rowSelection: RowSelectionOptions = {
    mode: "multiRow",
    headerCheckbox: false,
  };
  selectedEmployee: any | null = null;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }
  onSelectionChanged(event: SelectionChangedEvent): void {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length > 0) {
      this.selectedEmployee = selectedRows[0]; 
      console.log('Selected Employee:', this.selectedEmployee);
    }
    else {
      this.selectedEmployee = null;
    }
  }


  addEmployee(newEmployee: any): void {
    console.log(newEmployee);
    this.employees.push(newEmployee);
    this.gridApi.applyTransaction({ add: [newEmployee] });
    this.showModal = false;
  }

  openEditEmployeeModal(employee: any): void {
    this.selectedEmployee = { ...employee };
    this.showModal = true;
  }

  onEmployeeUpdated(updatedEmployee: any): void {
    const index = this.employees.findIndex((e) => e.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
      this.gridApi.applyTransaction({ update: [updatedEmployee] });
    }
    this.showModal = false;
    this.selectedEmployee = null;
  }

  updateEmployee(employee: any): void {
    if (this.selectedEmployee) {
      const index = this.employees.findIndex((e) => e.id === this.selectedEmployee?.id);
      if (index > -1) {
        this.employees[index] = employee;
        this.gridApi.applyTransaction({ update: [employee] });
      }
      this.showModal = false;
    }
  }


  toggleModal(): void {
    if (this.selectedEmployee) {
      this.showModal = true;
    } else {
      this.selectedEmployee = null;
      this.showModal = true;
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedEmployee = null;
  }

  deleteSelectedEmployees(): void {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length === 0) {
      alert("No employees selected!");
      return;
    }

    const selectedEmployeeIds = selectedRows.map((row: { id: any; }) => row.id);
    this.employees = this.employees.filter(employee => !selectedEmployeeIds.includes(employee.id));
    this.gridApi.setRowData(this.employees);
  }
}
