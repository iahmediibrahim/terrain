import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-modal',
  templateUrl: './addModal.component.html',
  styles: [],
})
export class AddModalComponent implements OnInit {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
