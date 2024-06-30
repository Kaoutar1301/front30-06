import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalService } from '../../services/modal-service.service';
import { Subscription } from 'rxjs';
import { ProjectComponent } from '../../projects/project/project.component';
import { ListComponent } from '../../lists/list/list.component';
import { GetProjectsService } from '../../services/get-projects.service';
import { Project } from '../../models/project';
import { List } from '../../models/lists';
import { ApiService } from '../../services/service-api.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProjectComponent, ListComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  selectedProject: number = 0;
  isModalOpen = false;
  projects: Project[] = [];
  filteredLists: List[] | undefined = [] ;

  private modalSubscription: Subscription = new Subscription();

  constructor(
    private modalService: ModalService,
    private getProjectsService: GetProjectsService,
    private apiService: ApiService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.fetchProjects();
    console.log(this.projects)
    this.modalSubscription = this.modalService.watch().subscribe((status) => {
      this.isModalOpen = status === 'open';
    });
    this.subscribeToProjectChanges();


   
    
  }

  // hasFilteredLists(): boolean {
  //   return this.filteredLists.length > 0;
  // }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  private fetchProjects() {
    this.getProjectsService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
      if (this.selectedProject) {
        this.onProjectSelected(this.selectedProject);
      }
    });
  }

  private subscribeToProjectChanges() {
    this.apiService.projectCreated$.subscribe(this.fetchProjects.bind(this));
    this.apiService.listCreated$.subscribe(this.fetchProjects.bind(this));
    this.apiService.taskCreated$.subscribe(this.fetchProjects.bind(this));
    this.apiService.commentCreated$.subscribe(this.fetchProjects.bind(this));
  }

  onProjectSelected(projectId: number) {
    this.selectedProject = projectId;
    const selectedProject = this.projects.find(
      (project) => project.id === projectId
    );
    this.filteredLists = selectedProject?.lists ?? [];
    this.filteredLists = this.filteredLists ?? [];
    // this.hasFilteredLists();
  }

  toggleModal(action: string, projectId: number, data:any): void {
    this.storeService.isUpdate = false;
    this.modalService.open(action, projectId,data);
  }

  toggleModalClose() {
    this.modalService.close();
  }

  onProjectDeleted(deletedProjectId: number) {
    this.projects = this.projects.filter(
      (project) => project.id !== deletedProjectId
    );
  }
}
