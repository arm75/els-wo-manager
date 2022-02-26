import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../../../core/services/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "../../../core/models/user";


@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Delete User";
  entityId: null;
  entityData!: User;

  constructor( private matDialogRef: MatDialogRef<UserDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: UserService,
               private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.dataLoaded = false;
    this.entityId = this.data.entityId;

    if (this.entityId != null) {
      this.entityService.get(this.entityId)
        .toPromise()
        .then(data => {
          this.entityData = data;
          this.dataLoaded = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  deleteEntity(): void {
    this.entityService.delete(this.entityId)
      .subscribe(data => {
        console.log("User " + this.entityId  + " deleted successfully.");
        this.matSnackBar.open("User " + this.entityId  + " deleted successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. User not deleted: " + error);
        this.matSnackBar.open("An error has occurred. User not deleted: " + error);
        this.matDialogRef.close();
      });
  }

}

