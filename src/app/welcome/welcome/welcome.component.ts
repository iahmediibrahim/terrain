import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit() {}
  open(content) {
    this.modalService.open(content, {
      windowClass: 'modal-holder',
      centered: true,
    });
  }
}
