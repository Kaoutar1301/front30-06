import { Component, Input, OnDestroy, OnInit } from '@angular/core'; // Removed duplicate 'input'
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalService } from '../../services/modal-service.service';
import { Subscription } from 'rxjs';
import { Task } from '../../models/task';
import { List } from '../../models/lists';
import { TaskCardComponent } from '../../tasks/task-card/task-card.component';
import { ApiService } from '../../services/service-api.service';
import { StoreService } from '../../services/store.service';


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

  constructor(private modalService: ModalService, private apiService: ApiService, private storeService: StoreService) {}

  ngOnInit() {
    console.log(this.title);
    this.modalSubscription = this.modalService.watch().subscribe((status) => {
      // Handle modal status changes here if needed
    });

    console.log('Listsid: ', this.listId);

    this.prepareLists();
  }

  deleteList(id: number) {
    // Step 1: Find the index of the list to delete
    const index = this.lists.findIndex((list) => list.id === this.listId);

    // Step 2: Remove the list from the lists array
    this.lists.splice(index, 1);

    // Step 3: Update the processed lists
    this.prepareLists();

    // call api service  to delete with this id
    this.apiService.delete(id, 'list').subscribe(() => {
      this.apiService.listCreated();
    });
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

  toggleModalList(action: string, id: number, data:any, projectid: any) {
    this.storeService.isUpdate = false;
    this.modalService.openList(action, id, data, projectid);
  }

  toggleModal(action: string, id: number, data: any) {
    this.storeService.isUpdate = true;
    this.modalService.open(action, id, data);
  }

  toggleModalClose() {
    this.modalService.close();
  }

  // Additional methods interacting with the modal can be added here
}
