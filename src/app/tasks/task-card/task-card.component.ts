import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/service-api.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { Comments } from '../../models/comment';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  imports: [CommonModule,ReactiveFormsModule],
  standalone: true,
})
export class TaskCardComponent implements OnInit {
  @Input() taskId?: string | number = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() comments: Comments[] = [];
  @Input() Listid: number = 0;

  isVisible: boolean = false;
  showComments: boolean = false;
  commentForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      Text: ['', Validators.required],
      // You can add more fields here as needed
    });
  }

  toggleComments(): void {
    this.showComments = !this.showComments;
  }

  showCommentsList(): void {
    this.isVisible = !this.isVisible;
  }

  submitComment(): void {
    if (this.commentForm.valid) {
      const payload = {
        ...this.commentForm.value,
        taskId: this.taskId,
        author : "Anonymous" // Assuming taskId is needed for the comment
        // Add any other relevant fields here
      };

      console.log('Comment Payload:', payload);
      this.apiService.post(`${environment.apiUrl}/api/comment`, payload).subscribe({
        next: (response) => {
          console.log('Comment Success:', response);
          // Handle successful comment submission (e.g., refresh comments list)
        },
        error: (error) => console.error('Comment Error:', error),
      });
    }
  }

  // Methods for calculating card height remain unchanged
}