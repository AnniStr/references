/* Leah */

import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngbd-modal-content',
  template: `
    <div id="myModal">
      <div class="modal-header">
        <h4 class="modal-title">Session Timeout</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Your session has expired. You need to login to return to your profile.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark"(click)="activeModal.close('Login')" routerLink="/login">Login</button>
      </div>
    </div>
  `
})

export class NgbdModalContentComponent {
  @Input() name;
  constructor(public activeModal: NgbActiveModal) { }
}

@Component({
  selector: 'app-ngbd-modal-component',
  templateUrl: './modal-component.html'
})

export class NgbdModalComponent {
  constructor(private modalService: NgbModal) { }
}
