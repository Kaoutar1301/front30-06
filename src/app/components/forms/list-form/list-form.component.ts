// list-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/service-api.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class ListFormComponent implements OnInit {
  listForm: FormGroup = new FormGroup({});

  @Input() currentId: number = 0;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.listForm = this.fb.group({
      title: ['', Validators.required],
    });
  }

  submit() {
    if (this.listForm.valid) {
      const payload = {
        ...this.listForm.value,
        projectId: this.currentId,// Add the projectId field with currentId value
        Tasks: []
      };

      console.log('Payload:', payload)
      this.apiService.post(`${environment.apiUrl}/api/list`, payload).subscribe({
        next: (response) => {
          console.log('Success:', response);
          // Assuming there's a method to handle list creation event
          this.apiService.listCreated(); // Publish the event
        },
        error: (error) => console.error('Error:', error),
      });
    }
  }
}
