import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class CommentComponent {
  commentForm: FormGroup = new FormGroup({
    comment: new FormControl(''),
  });

  @Output() commentSubmitted = new EventEmitter<void>(); // Add this line

  constructor() {}

  onSubmit(event: Event): void {
    event.preventDefault(); // Prevent form refresh
    console.log(this.commentForm.value);
    this.commentSubmitted.emit(); // Emit the event on form submission
  }
}
