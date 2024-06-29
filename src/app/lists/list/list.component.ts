import { Component, Input, OnDestroy, OnInit } from '@angular/core'; // Removed duplicate 'input'
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalService } from '../../services/modal-service.service';
import { Subscription } from 'rxjs';
import { Task } from '../../models/task';
import { List } from '../../models/lists';
import { TaskCardComponent } from '../../tasks/task-card/task-card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ModalComponent, TaskCardComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() tasks: Task[] = [];
  @Input() lists: List[] = [];
  @Input() projectId: number = 0;

  processedLists: List[] = [];
  tasksList: Task[] = [];


  @Input() listId: number = 0;

  private modalSubscription: Subscription = new Subscription();

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    console.log(this.title);
    this.modalSubscription = this.modalService.watch().subscribe((status) => {

      // Handle modal status changes here if needed
    });


    console.log("Listsid: ", this.listId);


    this.prepareLists();

  }

  prepareLists() {
    // Process the lists here. For now, it's just copying them.
    // This is where you could filter or transform the lists as needed.
    this.processedLists = this.lists.map((list) => ({
      ...list,
      tasks: list.tasks, // Assuming you might want to filter or modify tasks in the future
    }));

    // Step 2, 3, 4: Iterate through each list and accumulate tasks into tasksList
    this.tasksList = this.lists.reduce(
      (acc: Task[], list) => acc.concat(list.tasks),
      []
    );
  }

  // Example method in your list.component.ts
  get filteredLists() {
    return this.lists.map((list) => ({
      ...list,
      tasks: list.tasks,
    }));
  }
  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  toggleModal(action: string, id: number) {
    this.modalService.open(action, id);
  }

  toggleModalClose() {
    this.modalService.close();
  }

  // Additional methods interacting with the modal can be added here
}