import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private projectCreatedSource = new Subject<void>();
  private listCreatedSource = new Subject<void>(); // New Subject for list creation
  private taskCreatedSource = new Subject<void>(); // New Subject for task creation
  private commentCreatedSource = new Subject<void>(); // New Subject for comment creation

  projectCreated$ = this.projectCreatedSource.asObservable();
  listCreated$ = this.listCreatedSource.asObservable(); // New Observable for list creation
  taskCreated$ = this.taskCreatedSource.asObservable(); // New Observable for task creation
  commentCreated$ = this.commentCreatedSource.asObservable(); // New Observable for comment creation

  apiurl = `${environment.apiUrl}/api`;

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

  commentCreated() {
    this.commentCreatedSource.next(); // Emit event for comment creation
  }

  post(formData: FormData, formType: string): Observable<any> {
    return this.http.post(`${this.apiurl}/${formType}`, formData);
  }

  delete(id: number, formType: string): Observable<any> {
    return this.http.delete(`${this.apiurl}/${formType}/${id}`);
  }

  update(id: number, data: any, formType: string): Observable<any> {
     console.log('Data:', data);
    return this.http.put(`${this.apiurl}/${formType}/${id}`, data);
    // return this.http.put(`${this.apiurl}/${formType}/${id}`, data);


  }
}
