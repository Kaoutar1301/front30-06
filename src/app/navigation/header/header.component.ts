import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalService } from '../../services/modal-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ModalComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isModalOpen = false;
  private modalSubscription: Subscription = new Subscription();

  constructor(private modalService: ModalService) {}
  projectid: number = 0;

  ngOnInit() {
    this.modalSubscription = this.modalService.watch().subscribe((status) => {
      this.isModalOpen = status === 'open';
    });
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  toggleModal(action: string, id: number) {
    this.modalService.open(action, id);
  }

  toggleModalClose() {
    this.modalService.close();
  }
}
