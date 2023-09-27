import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Movie, MovieReviews } from 'src/app/interfaces/movie';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-list-group',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponen {
  @Input() list!: any;

  constructor(
    private modalService: ModalService
  ) {}

  openItem() {
    this.modalService.toggleModal();
  }

}
