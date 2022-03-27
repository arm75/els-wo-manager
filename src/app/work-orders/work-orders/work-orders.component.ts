import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/security/authentication.service";
import {User} from "../../core/models/user";

@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.css']
})
export class WorkOrdersComponent implements OnInit, AfterViewInit, AfterViewChecked {

  loggedInUser: any;
  loggedInRole: any;
  nameToDisplay: any;
  dataLoaded = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
  }

  ngOnInit(): void {
    this.nameToDisplay = this.loggedInUser?.username;
    this.loggedInRole = this.loggedInUser?.role;
    this.dataLoaded = true;

  }

  ngAfterViewInit(): void {

    // alert(this.nameToDisplay);
    //alert(this.loggedInRole);
  }

  ngAfterViewChecked(): void {

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
