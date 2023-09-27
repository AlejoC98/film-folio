import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  isModalVisible = false;

  constructor() { }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }
}
