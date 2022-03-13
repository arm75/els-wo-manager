import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/security/authentication.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  loggedInUser!: any;
  nameToDisplay!: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {

    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    //console.log(this.loggedInUser);
    this.nameToDisplay = this.loggedInUser.username;

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
