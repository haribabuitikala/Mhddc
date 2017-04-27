import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {
  @ViewChild('modal') modal:ModalComponent;

  constructor() {
  }

  serviceRepair() {
    window.location.href = 'http://hdservices.homedepot.com/services/garage-door-opener-repair/';
  }

  showModal() {
    this.modal.open();

  }

  ngOnInit() {
  }

}
