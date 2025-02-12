import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink], // Import ReactiveFormsModule here
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {
  @Input() employeeToEdit: any | null = null;
  addEmployeeForm: FormGroup;
  @Output() closeModal = new EventEmitter<void>();
  @Output() newEmployee = new EventEmitter<void>();
  @Output() updateEmployee = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.addEmployeeForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Use email validator
      phone: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeeToEdit'] && this.employeeToEdit) {
      this.addEmployeeForm.patchValue({
        name: this.employeeToEdit.name,
        username: this.employeeToEdit.username,
        email: this.employeeToEdit.email,
        phone: this.employeeToEdit.phone,
      });
  }
}

  close(): void {
    this.closeModal.emit();
  }

  addUpdateEmployee(): void {
    if (this.addEmployeeForm.invalid) {
      alert('Please fill out all fields.');
      return;
    }

    const employeeData = this.addEmployeeForm.value;

    if (this.employeeToEdit) {
      const updatedEmployee = { ...this.employeeToEdit, ...employeeData };
      this.employeeService.updateEmployee(updatedEmployee).subscribe((response) => {
        this.updateEmployee.emit(updatedEmployee);
        this.close();
      });
    } 
   this.newEmployee.emit(this.addEmployeeForm.value);
  }

}
