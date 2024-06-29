import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay, catchError, tap } from 'rxjs/operators';
import { Project } from '../models/project'; // Import Project interface

@Injectable({
  providedIn: 'root'
})
export class GetProjectsService {
  private projects$: Observable<Project[]> = of([]);
  private dataFetched: boolean = false;
  private projects: Project[] = [];

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    if (!this.dataFetched) {
      this.projects$ = this.http.get<Project[]>('https://trellobackendupdate.azurewebsites.net/api/project').pipe(
        shareReplay(1),
        catchError(error => {
          console.error('HTTP error occurred', error);
          return of([]);
        }),
        tap((projects: Project[]) => this.projects = projects)
      );
      this.dataFetched = true;
    }
    return this.projects$;
  }
}