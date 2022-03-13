import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/security/authentication.service";
import {User} from "../../core/models/user";

@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.css']
})
export class WorkOrdersComponent implements OnInit {

  loggedInUser!: any;
  nameToDisplay!: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    // console.log(this.loggedInUser);
    this.nameToDisplay = this.loggedInUser.username;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
