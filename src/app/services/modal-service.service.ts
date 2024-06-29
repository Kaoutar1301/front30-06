import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ActionItemId {
  action: string;
  Id: number;
}
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private display: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<
    'open' | 'close'
  >('close');
  private action: BehaviorSubject<ActionItemId> =
    new BehaviorSubject<ActionItemId>({ action: '', Id: 1 });

  watch() {
    return this.display.asObservable();
  }

  watchAction() {
    return this.action.asObservable();
  }

  open(action: string, Id: number) {
    console.log(`Opening modal for action: ${action} with Project ID: ${Id}`);
    this.action.next({ action, Id }); // Update action state with both action and projectId
    this.display.next('open');
    
  }

  close() {
    console.log('Modal is closing');
    this.display.next('close');
  }
}
