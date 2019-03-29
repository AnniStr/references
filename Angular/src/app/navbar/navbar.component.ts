/* Alle (Jannik: angelegt, Toggler, Scrolling) */

import {Component, HostListener, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../shared/user.service';
import { ProductService } from '../shared/product.service';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [NGXLogger, ProductService]
})

export class NavbarComponent implements OnInit {
  navbarOpen = false;
  langIsSet = sessionStorage.getItem('langIsSet') || false;

  constructor(private translate: TranslateService,
              public productService: ProductService, public userService: UserService,
              private router: Router) {
    translate.setDefaultLang('en');
    translate.use('en');
    translate.addLangs(['de']);
  }

  ngOnInit() { }

  selectLang(lang) {
    this.translate.use(lang);
    this.productService.showProductList();
    if (lang === 'de') {
      sessionStorage.setItem('langIsSet', JSON.stringify(true));
    } else {
      sessionStorage.setItem('langIsSet', JSON.stringify(false));
    }
  }

  onLogout() {
    location.reload();
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  // Jannik
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    const navbar = document.getElementsByClassName('navbar');
    if (this.navbarOpen) {
      for (let i = 0; i < navbar.length; i++) {
        navbar[i].className += ' navbar-open';
      }
    } else if (!this.navbarOpen) {
      for (let i = 0; i < navbar.length; i++) {
        navbar[i].classList.remove('navbar-open');
      }
    }
  }

  // Jannik
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const navbar = document.getElementsByClassName('navbar');
    const toggler = document.getElementsByClassName('navbar-toggler');
    if (number > 5) {
      for (let i = 0; i < navbar.length; i++) {
        navbar[i].className += ' navbar-compact';
      }
      for (let i = 0; i < navbar.length; i++) {
        toggler[i].className += ' toggler-compact';
      }
    } else if (number < 5) {
      for (let i = 0; i < navbar.length; i++) {
        navbar[i].classList.remove('navbar-compact');
      }
      for (let i = 0; i < navbar.length; i++) {
        toggler[i].classList.remove('toggler-compact');
      }
    }
  }

}
