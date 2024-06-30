// project-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/service-api.service';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../../services/store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService } from '../../../services/modal-service.service';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup = new FormGroup({});
  formType: string = 'Project';
  isUpdateValue: boolean = false;

  @Input() currentId: number = 0;

  constructor(private fb: FormBuilder, private apiService: ApiService, private storeService: StoreService, private snackBar: MatSnackBar, private modalService: ModalService) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.isUpdateValue = this.storeService.isUpdate;
  }
  edit(id: number, formType: string) {
    console.log(`Editing project with id: ${id}`);
    // Create a payload with the form values and add the id as a key
    const payload = {
      ...this.projectForm.value,
      id: id // Add the id to the payload
    };
  
    this.apiService.update(id, payload, formType).subscribe({
      next: (project) => {
        this.projectForm.patchValue(project);
        console.log('Project details fetched for editing:', project);
        this.apiService.projectCreated();
      },
      error: (error) => console.error('Error fetching project details:', error),
    });

    this.apiService.projectCreated();
  }


  submit() {
    if (this.projectForm.valid) {
      this.apiService.post(this.projectForm.value, 'project').subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.apiService.projectCreated();
          this.modalService.close();
          this.snackBar.open('Project created successfully!', 'Close', {
            duration: 3000, 
            panelClass: ['custom-snackbar']// Duration in milliseconds after which the snack-bar will be automatically dismissed.
          }); // Publish the event
        },
        error: (error) => console.error('Error:', error),
      });
    }
  }
}
