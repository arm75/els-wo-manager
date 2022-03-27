import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { LocationService } from "../../../core/services/location.service";
import { MatSelect} from "@angular/material/select";
import { CustomerService} from "../../../core/services/customer.service";
import { ElsWoManagerConstants } from "../../../core/els-wo-manager-constants";
import { GlobalSnackBarService } from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {
  formTitle: string = "Add Location";
  addForm: FormGroup = new FormGroup({});
  usStates = ElsWoManagerConstants.usStatesSelectArray;

  @ViewChild('customerSelect')
  customerSelect!: MatSelect;
  customerLoaded: any;
  customerSelected: any;

  constructor( private matDialogRef: MatDialogRef<LocationAddComponent>,
               private entityService: LocationService,
               private customerService: CustomerService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      'customer': new FormControl('', [Validators.required]),
      'entityName': new FormControl('', [Validators.required])
    });
    this.loadCustomerSelect();
  }

  selectChange() {
  }

  loadCustomerSelect() {
    this.customerService.getAll().subscribe(
      data => {
        this.customerLoaded = data;
      },error => {
      }
    );
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Location added successfully.");
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }

}
