import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private projectCreatedSource = new Subject<void>();
  private listCreatedSource = new Subject<void>(); // New Subject for list creation
  private taskCreatedSource = new Subject<void>(); // New Subject for task creation

  projectCreated$ = this.projectCreatedSource.asObservable();
  listCreated$ = this.listCreatedSource.asObservable(); // New Observable for list creation
  taskCreated$ = this.taskCreatedSource.asObservable(); // New Observable for task creation

  constructor(private http: HttpClient) {}

  get(url: string): Observable<any> {
    return this.http.get(url);
  }

  projectCreated() {
    this.projectCreatedSource.next();
  }

  listCreated() {
    this.listCreatedSource.next(); // Emit event for list creation
  }

  taskCreated() {
    this.taskCreatedSource.next(); // Emit event for task creation
  }

  fetchDataForPage(url: string) {
    const apiUrl = `http://localhost:3000/projects`;
    return this.http.get(apiUrl);
  }

  post(url: string, formData: FormData): Observable<any> {
    return this.http.post(url, formData);
  }
}
