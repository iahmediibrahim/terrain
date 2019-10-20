import { EditModalComponent } from './editModal/editModal.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodelistsService } from '../codelists-service/codelists.service';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddModalComponent } from './addModal/addModal.component';
@Component({
  selector: 'app-datatype',
  templateUrl: './codelist.component.html',
  styleUrls: ['./codelist.component.scss'],
})
export class CodelistComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private codelistsService: CodelistsService,
    private modalService: NgbModal,
  ) {}
  add = AddModalComponent;
  edit = EditModalComponent;
  datatype;
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getProject(id);
  }
  open(e) {
    console.log(e);
    const modalRef = this.modalService.open(e, {
      centered: true,
      windowClass: 'openModal',
    });
    modalRef.componentInstance.name = 'World';
  }

  getProject(id) {
    this.codelistsService.getProjectWithId(id).subscribe(datatype => {
      this.datatype = datatype;
    });
  }
  delete() {
    swal
      .fire({
        type: 'warning',
        title: 'Are you sure to Delete this Record?',
        text: 'Deleting this data maybe be harmful for any related objects!',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it!',
        confirmButtonColor: 'rgb(255, 51, 102)',
        cancelButtonColor: 'rgb(204, 204, 204, .8)',
        customClass: {
          confirmButton: 'border-32',
          cancelButton: 'border-32',
        },
      })
      .then(result => {
        if (result.value) {
          //
        } else if (result.dismiss === swal.DismissReason.cancel) {
          return true;
        }
      });
  }
}
