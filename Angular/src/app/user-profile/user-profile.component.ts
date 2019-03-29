/* Leah */

import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ItemService } from '../shared/item.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContentComponent } from '../modal/modal-component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [ItemService]
})

export class UserProfileComponent implements OnInit {
  userDetails;
  constructor(private userService: UserService, private itemService: ItemService, private router: Router,
              private modalService: NgbModal,
              @Inject(SESSION_STORAGE) public storage: WebStorageService) {}

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
        res => {
          this.userDetails = res['user'];

          // Anni
          // add the Cart in the Session to users Cart in DB
          const sessionCart = JSON.parse(sessionStorage.getItem('cart'));
          if (sessionCart) {
            for ( let i = 0; i < sessionCart.length; i++) {
              const SessionItem = sessionCart[i];
              SessionItem.userEmail = res['user'].email;
              this.itemService.postItem(SessionItem).subscribe(
                  response => console.log(response),
                  err => console.log(err)
              ); // add Items in Session to DB
            }
          }
          setTimeout(function() {
            sessionStorage.removeItem('item');
            sessionStorage.removeItem('cart');
          }, 2000);

        },
        err => {
          this.router.navigate(['/']);
          this.userService.deleteToken();
          this.showModal();
          console.log(err);
        }
    );
  }

  showModal() {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
