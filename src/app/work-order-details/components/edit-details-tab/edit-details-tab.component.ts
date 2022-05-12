import { Component, OnInit } from '@angular/core';
import {map} from "rxjs/operators";
import {User} from "../../../core/models/user";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-details-tab',
  templateUrl: './edit-details-tab.component.html',
  styleUrls: ['./edit-details-tab.component.css']
})
export class EditDetailsTabComponent implements OnInit {

  dataLoaded: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }



  // loadWorkOrderIntoView(): void {
  //   this.entityService.get(this.passedWorkOrderId)
  //     .toPromise()
  //     .then(data => { this.entityData = data; })
  //     .finally(() => {
  //       //this.loggedInRole = this.loggedInUser?.role;
  //       //this.nameToDisplay = this.loggedInUser?.username;
  //       this.updateFieldBoxes();
  //       this.editForm = this.formBuilder.group({
  //         'id': new FormControl(this.entityData.id),
  //         'status': new FormControl(this.entityData.status),
  //         'customer': new FormControl({ value: this.entityData.customer, disabled: true}, [Validators.required]),
  //         'location': new FormControl({ value: this.entityData.location, disabled: true}, [Validators.required]),
  //         'assignedUsers': new FormControl({ value: this.entityData.assignedUsers, disabled: true}, [Validators.required]),
  //         'quickDescription': new FormControl({ value: this.entityData.quickDescription, disabled: true}, [Validators.required]),
  //         'description': new FormControl({ value: this.entityData.description, disabled: true}),
  //         'contactName': new FormControl({ value: this.entityData.contactName, disabled: true}, [Validators.required]),
  //         'contactPhoneNumb': new FormControl({ value: this.entityData.contactPhoneNumb, disabled: true}, [Validators.required]),
  //         'contactAltPhoneNumb': new FormControl({ value: this.entityData.contactAltPhoneNumb, disabled: true}),
  //         'notes': new FormControl({ value: this.entityData.notes, disabled: true}),
  //         'privateNotes': new FormControl({ value: this.entityData.privateNotes, disabled: true}),
  //         'entryInstruct': new FormControl({ value: this.entityData.entryInstruct, disabled: true}, [Validators.required]),
  //         'inventoryItemsTotal': new FormControl(this.entityData.inventoryItemsTotal),
  //         'laborItemsTotal': new FormControl(this.entityData.laborItemsTotal),
  //         'subcontractorItemsTotal': new FormControl(this.entityData.subcontractorItemsTotal),
  //         'toolEquipmentItemsTotal': new FormControl(this.entityData.toolEquipmentItemsTotal),
  //         'workOrderTotal': new FormControl(this.entityData.workOrderTotal)
  //       });
  //       this.dataLoaded = true;
  //       this.loadLocationSelect(this.entityData.customer.id);
  //       this.userData = this.entityData.assignedUsers;
  //       this.loadAssignedUsersSelect();
  //     });
  // }
  //
  //
  //
  //
  //
  // addUserToWorkOrder() {
  //   this.userData.push(this.assignedUsersSelected);
  //   this.loadAssignedUsersSelect();
  //   this.assignedUsersSelected = "";
  // }
  //
  // removeUserFromWorkOrder(userToRemove: User) {
  //   if (this.userData.length > 1) {
  //     this.userData = this.userData.filter(function (obj: { id: number; }) {
  //       return obj.id !== userToRemove.id;
  //     });
  //   }
  //   this.loadAssignedUsersSelect();
  // }
  //
  //
  //
  //
  // customerSelectChange() { this.loadLocationSelect(this.customerSelected.id); }
  //
  // locationSelectChange() { }
  //
  // assignedUsersSelectChange() { }
  //
  //
  //
  //
  //
  // loadCustomerSelect() {
  //   this.customerService.getAll().subscribe(
  //     data => {
  //       this.customerLoaded = data;
  //     },error => {
  //     }
  //   );
  // }
  //
  // loadLocationSelect(passedCustomerId?: any) {
  //   if(passedCustomerId) {
  //     this.locationService.getAll()
  //       .pipe(map(items =>
  //         items.filter(item => (item.customer.id == passedCustomerId))))
  //       .subscribe(data => {
  //           this.locationLoaded = data;
  //         }, error => {
  //         }
  //       );
  //   } else {
  //     this.locationService.getAll()
  //       .subscribe(data => {
  //           this.locationLoaded = data;
  //         }, error => {
  //         }
  //       );
  //   }
  // }
  //
  // loadAssignedUsersSelect() {
  //   this.userService.getAll().subscribe(
  //     data => {
  //       this.assignedUsersLoaded = data;
  //       this.assignedUsersLoaded = this.assignedUsersLoaded.filter((ar: { id: number; }) => !this.userData.find((rm: { id: number; }) => (rm.id === ar.id) ));
  //     },error => {
  //     }
  //   );
  // }

}
