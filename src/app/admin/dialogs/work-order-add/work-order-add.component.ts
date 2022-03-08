import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { WorkOrderService } from "../../../core/services/work-order.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSelect } from "@angular/material/select";
import { LocationService } from "../../../core/services/location.service";
import { CustomerService } from "../../../core/services/customer.service";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-work-order-add',
  templateUrl: './work-order-add.component.html',
  styleUrls: ['./work-order-add.component.css']
})
export class WorkOrderAddComponent implements OnInit {

  formTitle: string = "Add Work Order";
  addForm: FormGroup = new FormGroup({});

  @ViewChild('customerSelect')
  customerSelect!: MatSelect;
  customerLoaded: any;
  customerSelected!: string;

  @ViewChild('locationSelect')
  locationSelect!: MatSelect;
  locationLoaded: any;
  locationSelected!: string;

  constructor( private matDialogRef: MatDialogRef<WorkOrderAddComponent>,
               private entityService: WorkOrderService,
               private customerService: CustomerService,
               private locationService: LocationService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) {
    this.loadCustomerSelect();
    this.loadLocationSelect();
  }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      'quickDescription': new FormControl(''),
      'customerPo': new FormControl(''),
      'customerId': new FormControl(''),
      'locationId': new FormControl(''),
      'description': new FormControl(''),
      'entryInstruct': new FormControl(''),
      'inventoryItemsTotal': new FormControl(''),
      'laborItemsTotal': new FormControl(''),
      'subcontractorItemsTotal': new FormControl(''),
      'toolEquipmentItemsTotal': new FormControl(''),
      'workOrderTotal': new FormControl('')
    });
  }

  customerSelectChange() {
    // alert(this.customerSelected);
    this.loadLocationSelect((this.customerSelected));
    //console.log(this.selected);
    // alert("You selected" + this.selected);
  }

  locationSelectChange() {
    //alert(this.locationSelected);
  }

  loadCustomerSelect() {
    this.customerService.getAll().subscribe(
      data => {
        console.log(data);
        this.customerLoaded = data;
      },error => {
        console.log(error);
      }
    );
  }

  loadLocationSelect(passedCustomerId?: any) {
    // if(passedCustomerId) {
      this.locationService.getAll()
        .pipe(map(items =>
          items.filter(item => (item.customerId == passedCustomerId))))
        .subscribe(
        data => {
          console.log(data);
          this.locationLoaded = data;
        }, error => {
          console.log(error);
        }
      );
    // } else {
    //   this.locationService.getAll().subscribe(
    //     data => {
    //       console.log(data);
    //       this.locationLoaded = data;
    //     }, error => {
    //       console.log(error);
    //     }
    //   );
    // }
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matSnackBar.open("Work Order added successfully.");
        console.log("Work Order added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Work Order not added: " + error);
        this.matSnackBar.open("An error has occurred. Work Order not added: " + error);
        this.matDialogRef.close();
      });
  }
}
