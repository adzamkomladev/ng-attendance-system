import { Component, OnInit } from '@angular/core';

import { faSignOutAlt, faUser, faFileAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faSignOutAlt = faSignOutAlt;
  faUser = faUser;
  faFileAlt = faFileAlt;
  faEdit = faEdit;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }


  onLogout(): void {
    this.auth.logout();
  }
}
