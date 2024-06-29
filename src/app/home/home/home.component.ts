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
import { Comments } from '../../models/comment';
import { Task } from '../../models/task';
import { ApiService } from '../../services/service-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProjectComponent, ListComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  selectedProject: number = 1;
  isModalOpen = false;
  projects: Project[] = [];
  // Placeholder variables for other models
  lists: List[] = []; // Assuming you might have a service to fetch lists
  comments: Comments[] = []; // Assuming you might have a service to fetch comments
  tasks: Task[] = []; // Assuming you might have a service to fetch tasks
  filteredLists?: List[] = [];

  private modalSubscription: Subscription = new Subscription();

  constructor(
    private modalService: ModalService,
    private getProjectsService: GetProjectsService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getProjectsService.getProjects().subscribe((projects: Project[]) => {
      this.onProjectSelected(1);
      this.projects = projects;

      console.log('projects', projects);

      // Extract lists from projects
      this.lists = projects.flatMap((project) => project.lists);
      // Map lists to tasks

      // Map tasks to comments
      this.comments = this.tasks.flatMap((task) => task.comments);
    });
    // Initialize other variables here if necessary
    this.modalSubscription = this.modalService.watch().subscribe((status) => {
      this.isModalOpen = status === 'open';
    });

    this.apiService.projectCreated$.subscribe(() => {
      // Perform actions here, e.g., fetch new data or update the view
      this.reloadData();
    });

    this.apiService.listCreated$.subscribe(() => {
      // Perform actions here, e.g., fetch new data or update the view
      this.reloadData();
    });

    this.apiService.taskCreated$.subscribe(() => {
      // Perform actions here, e.g., fetch new data or update the view
      this.reloadData();
    });
  }

  reloadData() {
    location.reload();
    // Logic to re-fetch data or update the component view
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
    console.log('destruction');
  }

  onProjectSelected(projectId: number) {
    this.selectedProject = projectId;
    console.log(this.selectedProject) // Update the selectedProject variable

    const selectedProject = this.projects.find(
      (project) => project.id === projectId
    );

    // Filter the lists array based on the projectId
    this.filteredLists = selectedProject?.lists;
  }

  toggleModal(action: string, projectId: number): void {
    // Your logic here, for example, opening a modal and passing the action and projectId
    console.log(`Action: ${action}, Project ID: ${projectId}`);
    // Assuming your modal service can handle the project ID
    this.modalService.open(action, projectId);
  }

  toggleModalClose() {
    this.modalService.close();
  }
}
