import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class GetProjectsService {

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('https://trellobackendupdate.azurewebsites.net/api/project').pipe(
      shareReplay(1),
      tap(() => console.log('fetched projects')),
      catchError(error => {
        console.error('HTTP error occurred', error);

        return of([]);
      })
    );
  }
}