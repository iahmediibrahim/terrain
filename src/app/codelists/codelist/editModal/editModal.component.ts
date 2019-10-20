import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './editModal.component.html',
  styles: [],
})
export class EditModalComponent implements OnInit {
  @Input() name;
  workflows = {
    name: null,
    description: null,
  };
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
