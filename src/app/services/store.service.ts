import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { List } from '../models/lists';
import { Comments } from '../models/comment';

interface GlobalState {
  projectId: number | null;
  listId: number | null;
  taskId: number | null;
  taskArray: Task[];
  commentArray: Comments[];
  listArray: List[];
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly _projectId = new BehaviorSubject<number | null>(null);
  private readonly _listId = new BehaviorSubject<number | null>(null);
  private readonly _taskId = new BehaviorSubject<number | null>(null);
  private readonly _tasks = new BehaviorSubject<Task[]>([]);
  private readonly _comments = new BehaviorSubject<Comments[]>([]);
  private readonly _listArray = new BehaviorSubject<List[]>([]);
  private readonly _isUpdate = new BehaviorSubject<boolean>(false);


  readonly projectId$: Observable<number | null> = this._projectId.asObservable();
  readonly listId$: Observable<number | null> = this._listId.asObservable();
  readonly taskId$: Observable<number | null> = this._taskId.asObservable();
  readonly tasks$: Observable<Task[]> = this._tasks.asObservable();
  readonly comments$: Observable<Comments[]> = this._comments.asObservable();
  readonly listArray$: Observable<List[]> = this._listArray.asObservable();
  readonly isUpdate$: Observable<boolean> = this._isUpdate.asObservable(); 

  constructor() {}

  get isUpdate(): boolean {
    return this._isUpdate.getValue();
  }

  set isUpdate(val: boolean) {
    this._isUpdate.next(val);
  }

  get projectId(): number | null {
    return this._projectId.getValue();
  }

  set projectId(val: number | null) {
    this._projectId.next(val);
  }

  get listId(): number | null {
    return this._listId.getValue();
  }

  set listId(val: number | null) {
    this._listId.next(val);
  }

  get taskId(): number | null {
    return this._taskId.getValue();
  }

  set taskId(val: number | null) {
    this._taskId.next(val);
  }

  get tasks(): Task[] {
    return this._tasks.getValue();
  }

  set tasks(val: Task[]) {
    this._tasks.next(val);
  }

  get comments(): Comments[] {
    return this._comments.getValue();
  }

  set comments(val: Comments[]) {
    this._comments.next(val);
  }

  get listArray(): List[] {
    return this._listArray.getValue();
  }

  set listArray(val: List[]) {
    this._listArray.next(val);
  }

  // Additional methods to manipulate the state (addTask, deleteList, etc.) can be added here
}