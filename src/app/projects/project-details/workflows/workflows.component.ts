import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.scss'],
})
export class WorkflowsComponent implements OnInit {
  constructor(private modalService: NgbModal) {}
  workflows = {
    name: null,
    description: null,
    type: null,
  };
  ngOnInit() {}
  open(content) {
    this.modalService.open(content, { centered: true, size: 'xl' });
  }
}
