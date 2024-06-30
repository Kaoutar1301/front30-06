import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalService } from '../../services/modal-service.service';
import { Subscription } from 'rxjs';
import { Project } from '../../models/project';
import { Task } from '../../models/task';
import { Comments } from '../../models/comment';
import { List } from '../../models/lists';
import { ApiService } from '../../services/service-api.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, RouterLink, ModalComponent],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  @Input() projects: Project[] = [];
  @Input() tasks: Task[] = [];
  @Input() comments: Comments[] = [];
  @Input() lists: List[] = [];
  @Output() projectClicked = new EventEmitter<number>();
  @Output() projectDeleted = new EventEmitter<number>();
  formType = 'Project';
  private modalSubscription: Subscription = new Subscription();

  constructor(
    private apiService: ApiService,
    private modalService: ModalService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    console.log('Project component initialized');
    this.modalSubscription = this.modalService.watch().subscribe((status) => {
      // Assuming the modal service has a method 'watch' that notifies about modal status
      console.log(`Modal status: ${status}`);
    });
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  onProjectClick(project: Project) {
    this.projectClicked.emit(project.id);
    this.storeService.projectId = project.id;
  }

  delete(id: number, formType: string) {
    console.log(`Deleting project with id: ${id}`);
    this.apiService.delete(id, formType).subscribe({
      next: () => {
        console.log(`Project with id: ${id} deleted successfully.`);
        this.projectDeleted.emit(id);
      },
      error: (error) => console.error('Error deleting project:', error),
    });
  }

  toggleModal(action: string, projectId: number, data: any) {
    this.storeService.isUpdate = true;
    // Assuming the modal service has an 'open' method that can be used to open a modal
    this.modalService.open(action, projectId, data);
  }

  toggleModalClose() {
    // Assuming the modal service has a 'close' method to close the modal
    this.modalService.close();
  }
}
