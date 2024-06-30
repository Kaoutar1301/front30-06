import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ActionItemId {
  action: string;
  Id: number;
  data: any;
}

interface ActionItemIdList extends ActionItemId {
  projectid: any;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private display: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<'open' | 'close'>('close');
  private action: BehaviorSubject<ActionItemId | ActionItemIdList> = new BehaviorSubject<ActionItemId | ActionItemIdList>({ action: '', Id: 0, data: {} });

  watch() {
    return this.display.asObservable();
  }

  watchAction() {
    return this.action.asObservable();
  }

  open(action: string, Id: number, data: any) {
    console.log(`Opening modal for action: ${action} with ID: ${Id}`);
    this.action.next({ action, Id, data });
    this.display.next('open');
  }
  
  openList(action: string, Id: number, data: any, projectid: any) {
    console.log(`Opening modal for action: ${action} with ID: ${Id} and project ID: ${projectid}`);
    this.action.next({ action, Id, data, projectid });
    this.display.next('open');
  }

  close() {
    console.log('Modal is closing');
    this.display.next('close');
  }
}