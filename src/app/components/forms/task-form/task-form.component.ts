// task-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../../services/service-api.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup = new FormGroup({});

  @Input() currentId: number = 0;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      Title: ['', Validators.required],
      Categorie: ['', Validators.required], // Added taskCategorie form control
      Description: ['', Validators.required], // Added taskDescription form control
      dueDate: ['', Validators.required],
    });
  }

  submit() {
    if (this.taskForm.valid) {
      const payload = {
        ...this.taskForm.value,
        listId: this.currentId, // Add the projectId field with currentId value
      };

      console.log('Payload:', payload);
      this.apiService
        .post(`${environment.apiUrl}/api/task`, payload)
        .subscribe({
          next: (response) => {
            console.log('Success:', response);
            // Assuming there's a method to handle task creation event
            this.apiService.taskCreated(); // Publish the event
          },
          error: (error) => console.error('Error:', error),
        });
    }
  }
}
