import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/security/authentication.service";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  loggedInUser!: any;
  loggedInUsername!: string;
  loggedInRole!: string;
  nameToDisplay!: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;
  }

  ngOnInit(): void {
    //this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    //console.log(this.loggedInUser);
    this.nameToDisplay = this.loggedInUser.username;

  }

  myTabFocusChange(changeEvent: MatTabChangeEvent) {
    console.log('Tab position: ' + changeEvent.tab.position);
  }
  myTabSelectedIndexChange(index: number) {
    console.log('Selected index: ' + index);
  }
  myTabSelectedTabChange(changeEvent: MatTabChangeEvent) {
    console.log('Index: ' + changeEvent.index);
  }
  myTabAnimationDone() {
    console.log('Animation done.');
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
