import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-actions-renderer',
  template: `
    <button (click)="onEdit()">Edit</button>
    <button (click)="onDelete()">Delete</button>
  `,
})
export class ActionsRendererComponent {
  params!: ICellRendererParams;

  // Initialize component with AG Grid params
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  onEdit() {
    // Get employee data from params
    const employee = this.params.data;
    console.log('Edit action for:', employee);
    // Call the updateEmployee method from the parent component
    if (this.params.context && this.params.context.componentParent) {
      this.params.context.componentParent.updateEmployee(employee);
    }
  }

  onDelete() {
    const employeeId = this.params.data.id;
    console.log('Delete action for:', employeeId);
    // Call the deleteEmployee method from the parent component
    if (this.params.context && this.params.context.componentParent) {
      this.params.context.componentParent.deleteEmployee(employeeId);
    }
  }
}
