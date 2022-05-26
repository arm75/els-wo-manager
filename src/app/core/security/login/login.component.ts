import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { User } from "../../models/user";
import { Observable, Subscription } from "rxjs";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { HeaderType } from "../header-type";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loggedInUser!: any;
  loggedInUsername!: string;
  loggedInRole!: string;
  nameToDisplay!: string;

  userToLogin: any;
  formTitle: string = "Login";
  loginFormGroup: FormGroup = new FormGroup({});
  public showLoading: boolean = false;
  private subscriptions: Subscription[] = [];
  loginErrorMessage!: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    //private matDialogRef: MatDialogRef<LoginComponent>,
    //private entityService: CustomerService,
    private formBuilder: FormBuilder,
    private userService: UserService

    //private matSnackBar: MatSnackBar
  ) {
    // this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    // //console.table(this.loggedInUser);
    // this.loggedInUsername = this.loggedInUser.username;
    // this.loggedInRole = this.loggedInUser.role;
    // this.nameToDisplay = this.loggedInUser!.firstName;
  }

  ngOnInit(): void {
    if(this.authenticationService.isLoggedIn()) {
      if((this.authenticationService.getUserFromLocalStorage()?.role == 'ROLE_ADMIN')||(this.authenticationService.getUserFromLocalStorage()?.role == 'ROLE_SUPER_ADMIN')) {
        this.router.navigateByUrl('/admin');
      } else {
        this.router.navigateByUrl('/workOrders');
      }
    } else {
      this.router.navigateByUrl('/login');
    }

    this.loginFormGroup = this.formBuilder.group({
      'username': new FormControl(''),
      'password': new FormControl(''),
    });
  }

  public async onLogin(user: User) {
    this.showLoading = true;
    //console.log(user);
    await this.authenticationService.login(user).toPromise()
      .then( async (response: HttpResponse<User>) => {
        const token = String(response.headers.get(HeaderType.JWT_TOKEN));
        this.authenticationService.saveTokenToLocalStorage(token);
        //if (response.body?.username != null) {
        await this.userService.getByUsername(response.body?.username).toPromise()
            .then( data => { this.userToLogin = data; })
            .finally(()=>{ this.authenticationService.saveUserToLocalStorage(this.userToLogin); });
        //}
      })
      .catch((error:HttpErrorResponse) => {
        //console.log(error);
        this.loginErrorMessage = error.error.message;
        this.showLoading = false;
      })
      .finally(() => {
        this.showLoading = false;
        this.router.navigateByUrl('/workOrders').then();
      });
  }

  // public onLogin(user: User): void {
  //   this.showLoading = true;
  //   //console.log(user);
  //   this.subscriptions.push(
  //     this.authenticationService.login(user).subscribe(
  //       (response: HttpResponse<User>) => {
  //         const token = String(response.headers.get(HeaderType.JWT_TOKEN));
  //         this.authenticationService.saveTokenToLocalStorage(token);
  //         if (response.body?.username != null) {
  //           this.userService.getByUsername(response.body?.username).subscribe(
  //             data => {
  //               this.authenticationService.saveUserToLocalStorage(data);
  //           });
  //         }
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.log(error);
  //         this.loginErrorMessage = error.error.message;
  //         this.showLoading = false;
  //       },
  //       () => {
  //         this.router.navigateByUrl('/workOrders').then();
  //         this.showLoading = false;
  //       })
  //   );
  // }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }



  onSubmit() {
  }

}
