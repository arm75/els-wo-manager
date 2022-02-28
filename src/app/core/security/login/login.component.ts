import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { CustomerService } from "../../services/customer.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MaterialKitModule } from "../../../shared/material-kit/material-kit.module";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { User } from "../../models/user";
import { Observable, Subscription } from "rxjs";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { HeaderType } from "../header-type";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  formTitle: string = "Login";
  loginFormGroup: FormGroup = new FormGroup({});
  public showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    //private matDialogRef: MatDialogRef<LoginComponent>,
    //private entityService: CustomerService,
    private formBuilder: FormBuilder,

    //private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    if(this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/workOrders');
    } else {
      this.router.navigateByUrl('/login');
    }



    this.loginFormGroup = this.formBuilder.group({
      'username': new FormControl(''),
      'password': new FormControl(''),
    });
  }

  public onLogin(user: User): void {
    this.showLoading = true;
    console.log(user);
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<User> | HttpErrorResponse) => {
          const token = String(response.headers.get(HeaderType.JWT_TOKEN));
          this.authenticationService.saveTokenToLocalStorage(token);
          if (!(response instanceof HttpErrorResponse)) {
            const userToSave: any = response.body;
            this.authenticationService.saveUserToLocalStorage(userToSave);
            this.router.navigateByUrl('/workOrders').then();
            this.showLoading = false;
          }
        }, (error: HttpErrorResponse) => {
          console.log(error);
          this.showLoading = false;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }



  onSubmit() {
  }

}