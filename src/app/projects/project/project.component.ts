import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project';
import { Task } from '../../models/task'; // Import Task model
import { Comments } from '../../models/comment'; // Import Comment model
import { List } from '../../models/lists'; // Import List model

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() projects: Project[] = [];
  @Input() tasks: Task[] = []; // Input for tasks
  @Input() comments: Comments[] = []; // Input for comments
  @Input() lists: List[] = []; // Input for lists
  @Output() projectClicked = new EventEmitter<number>(); // You can also type this according to your project model

  onProjectClick(project: any) {
    this.projectClicked.emit(project.id);
    console.log("test" + project.title)
    console.log("description" + project.description)
  }

  constructor() {}

  ngOnInit() {
    console.log('je suis project component');
  }
}
