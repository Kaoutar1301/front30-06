import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../services/service-api.service';
import { StoreService } from '../../services/store.service';
import { CommonModule } from '@angular/common';
import { Comments } from '../../models/comment';
import { FrenchDatePipe } from '../../pipes/french-date.pipe';
import { ModalService } from '../../services/modal-service.service';
import { Subscription } from 'rxjs';
import { CommentComponent } from '../../comments/comment/comment.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FrenchDatePipe,CommentComponent, MatIconModule ],
  standalone: true,
})
export class TaskCardComponent implements OnInit {
  @Input() taskId: number = 0;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() comments: Comments[] = [];
  @Input() Listid: number = 0;
  @Input() dueDate: string = '';
  @Input() projectid: number = 0;
 @Input() taskCategorie: string = '';

  isVisible: boolean = false;
  showAddCommentButton: boolean = true;
  showComments: boolean = false;
  commentForm: FormGroup = new FormGroup({});
  formType: string = 'Comment';
  private modalSubscription: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private storeService: StoreService,
    private modalService: ModalService
  ) {}

  getBackgroundColor(categorie: string): string {
    switch (categorie) {
      case 'Marketing':
        return '#30e49f';
      case 'Design':
        return '#FF584D';
      case 'Informatique':
        return '#FED440';
      default:
        return '#FFBBAB'; // Default color
    }
  }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      Text: ['', Validators.required],
      // You can add more fields here as needed
    });
    this.modalSubscription = this.modalService.watch().subscribe((status) => {
      // Assuming the modal service has a method 'watch' that notifies about modal status
      console.log(`Modal status: ${status}`);
    });
  }

  editTask(id: number) {
    this.storeService.taskId = id;
    this.storeService.listId = this.Listid;
    
    console.log(`Editing task with id: ${id}`);

    this.storeService.isUpdate = true;

    this.toggleModal('taskform', id, this.storeService.taskId);

  }

  deleteTask(id: number) {
    console.log('Taskid: ', this.taskId);

    // Step 1: Find the index of the list to delete

    // call api service  to delete with this id
    this.apiService.delete(id, 'task').subscribe(() => {
      this.apiService.taskCreated();
    });
  }

  toggleModal(action: string, projectId: number, data: any) {
    // Assuming the modal service has an 'open' method that can be used to open a modal
    this.modalService.open(action, projectId, data);
  }

  deleteComment = (id: number) => {
    // Assuming the modal service has a 'confirm' method that can be used to show a confirmation dialog
 
  }

  editComment = (id: number) => {

  }

  toggleComments() {
    this.showComments = !this.showComments;
    // Assuming showComments is true when comments are shown
    this.showAddCommentButton = !this.showComments;
  }
  showCommentsList(): void {
    this.isVisible = !this.isVisible;
  }
  submitComment(): void {
    
    if (this.commentForm.valid) {
      const payload = {
        ...this.commentForm.value,
        taskId: this.taskId,
        author: 'Anonymous', // Assuming taskId is needed for the comment
        // Add any other relevant fields here
      };

      console.log('Comment Payload:', payload);
      this.apiService.post(payload, this.formType).subscribe({
        next: (response) => {
          console.log('Comment Success:', response);
          // Handle successful comment submission (e.g., refresh comments list)
          this.apiService.commentCreated(); // Notify the ApiService that a comment has been created
        },
        error: (error) => console.error('Comment Error:', error),
      });
    }

  }
  // Methods for calculating card height remain unchanged
}
